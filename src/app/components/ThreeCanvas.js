"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // 🎬 Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 🌌 LUSION-STYLE 12,000 PARTICLE MORPHING ENGINE
    const PARTICLE_COUNT = 12000;

    // Buffer 0: Current Positions
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const initialPositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);

    // Shape Buffers for Scrollytelling Morphing
    const shapeSphere = new Float32Array(PARTICLE_COUNT * 3);
    const shapeTorusKnot = new Float32Array(PARTICLE_COUNT * 3);
    const shapeTunnel = new Float32Array(PARTICLE_COUNT * 3);
    const shapeGalaxy = new Float32Array(PARTICLE_COUNT * 3);

    // Color Palette — Electric Cyan to Deep Indigo
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorIndigo = new THREE.Color(0x818cf8);
    const colorEmerald = new THREE.Color(0x34d399);

    // Helper random in sphere
    const randomPointInSphere = (radius) => {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      const sinPhi = Math.sin(phi);
      return [
        r * sinPhi * Math.cos(theta),
        r * sinPhi * Math.sin(theta),
        r * Math.cos(phi),
      ];
    };

    // 1. Generate Shape A: 3D Sphere (Hero)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const [x, y, z] = randomPointInSphere(7.5);
      shapeSphere[i * 3] = x;
      shapeSphere[i * 3 + 1] = y;
      shapeSphere[i * 3 + 2] = z;

      // Assign initial position
      currentPositions[i * 3] = x;
      currentPositions[i * 3 + 1] = y;
      currentPositions[i * 3 + 2] = z;

      // Color gradient
      const mixRatio = Math.random();
      const c = colorCyan.clone().lerp(colorIndigo, mixRatio);
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    // 2. Generate Shape B: 3D Torus Knot (About)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random() * Math.PI * 2 * 3;
      const p = 2, q = 3;
      const r = 5.5 + Math.sin(q * u) * 1.2;
      const x = r * Math.cos(p * u) + (Math.random() - 0.5) * 0.8;
      const y = r * Math.sin(p * u) + (Math.random() - 0.5) * 0.8;
      const z = Math.sin(q * u) * 3 + (Math.random() - 0.5) * 0.8;

      shapeTorusKnot[i * 3] = x;
      shapeTorusKnot[i * 3 + 1] = y;
      shapeTorusKnot[i * 3 + 2] = z;
    }

    // 3. Generate Shape C: 3D Hyper-Tunnel (Divisions)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + (Math.random() - 0.5) * 1.5;
      const depth = (Math.random() - 0.5) * 22;

      shapeTunnel[i * 3] = Math.cos(angle) * radius;
      shapeTunnel[i * 3 + 1] = Math.sin(angle) * radius;
      shapeTunnel[i * 3 + 2] = depth;
    }

    // 4. Generate Shape D: Exploded Galaxy (Stats & CTA)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const armIndex = i % 4;
      const angle = (i / PARTICLE_COUNT) * Math.PI * 8 + (armIndex * Math.PI) / 2;
      const radius = Math.pow(Math.random(), 0.5) * 16;
      const spiralX = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      const spiralY = (Math.random() - 0.5) * 3;
      const spiralZ = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;

      shapeGalaxy[i * 3] = spiralX;
      shapeGalaxy[i * 3 + 1] = spiralY;
      shapeGalaxy[i * 3 + 2] = spiralZ;
    }

    // Create Buffer Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(currentPositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Glowing Particle Texture Shader
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 32;
    textureCanvas.height = 32;
    const ctx = textureCanvas.getContext("2d");
    const radGrad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
    radGrad.addColorStop(0.4, "rgba(56, 189, 248, 0.8)");
    radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 32, 32);

    const particleTexture = new THREE.CanvasTexture(textureCanvas);

    const material = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 📜 SCROLLYTELLING STATE & SMOOTH LERP
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    // Mouse Physics
    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 4;
    };
    window.addEventListener("pointermove", onPointerMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // 🎬 LUSION-STYLE ANIMATION & MORPH LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth scroll lerp
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

      const p = scrollProgress;
      const posAttr = particleSystem.geometry.attributes.position;
      const positionsArr = posAttr.array;

      // Morphing interpolation based on 4 scroll stages:
      // Stage 0 (p = 0.0 to 0.28): Sphere -> TorusKnot
      // Stage 1 (p = 0.28 to 0.62): TorusKnot -> Tunnel
      // Stage 2 (p = 0.62 to 1.0): Tunnel -> Exploded Galaxy

      let fromBuf, toBuf, morphRatio;

      if (p < 0.3) {
        fromBuf = shapeSphere;
        toBuf = shapeTorusKnot;
        morphRatio = p / 0.3;
      } else if (p < 0.65) {
        fromBuf = shapeTorusKnot;
        toBuf = shapeTunnel;
        morphRatio = (p - 0.3) / 0.35;
      } else {
        fromBuf = shapeTunnel;
        toBuf = shapeGalaxy;
        morphRatio = (p - 0.65) / 0.35;
      }

      // Smooth ease for morph transition
      const easeRatio =
        morphRatio < 0.5
          ? 2 * morphRatio * morphRatio
          : 1 - Math.pow(-2 * morphRatio + 2, 2) / 2;

      // Update 12,000 particle positions in real-time
      for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        const x1 = fromBuf[i];
        const y1 = fromBuf[i + 1];
        const z1 = fromBuf[i + 2];

        const x2 = toBuf[i];
        const y2 = toBuf[i + 1];
        const z2 = toBuf[i + 2];

        // Base morphed position
        let targetX = x1 + (x2 - x1) * easeRatio;
        let targetY = y1 + (y2 - y1) * easeRatio;
        let targetZ = z1 + (z2 - z1) * easeRatio;

        // Add subtle organic liquid noise animation
        const wave = Math.sin(time * 1.5 + targetX * 0.4) * 0.18;
        targetX += wave;
        targetY += Math.cos(time * 1.2 + targetZ * 0.4) * 0.18;

        // Smooth position lerp
        positionsArr[i] += (targetX - positionsArr[i]) * 0.1;
        positionsArr[i + 1] += (targetY - positionsArr[i + 1]) * 0.1;
        positionsArr[i + 2] += (targetZ - positionsArr[i + 2]) * 0.1;
      }

      posAttr.needsUpdate = true;

      // Particle System Global Rotation & Mouse Interaction
      particleSystem.rotation.y = time * 0.1 + p * Math.PI * 4;
      particleSystem.rotation.x = Math.sin(time * 0.08) * 0.2 + mouseY * 0.05;
      particleSystem.rotation.z = mouseX * 0.05;

      // Camera Z-Position adjustment on scroll for immersion
      camera.position.z = 24 - Math.sin(p * Math.PI) * 6;

      renderer.render(scene, camera);
    };

    animate();

    // Memory Disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-40 pointer-events-none overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
}
