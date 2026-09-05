"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import { Color } from 'three';

const hexToNormalizedRGB = hex => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform float uLightMode;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  float grain = rnd / 15.0 * uNoiseIntensity;
  vec3 result = uColor * pattern - vec3(grain);
if (uLightMode > 0.5) {
  float fold = smoothstep(0.28, 0.9, pattern);
  float specular = smoothstep(0.72, 0.98, pattern);
  vec3 shadowColor = uColor * 0.72;
  vec3 bodyColor = min(uColor * 1.18, vec3(1.0));
  vec3 lightBase = mix(shadowColor, bodyColor, fold);
  lightBase = mix(lightBase, vec3(1.0), specular * 0.92);
  float fineNoise = noise(gl_FragCoord.xy * 0.63 + vec2(17.0, 41.0));
  float grainSignal = (rnd + fineNoise - 1.0);
  float grainStrength = clamp(uNoiseIntensity * 0.038, 0.0, 0.16);
  result = lightBase + grainSignal * grainStrength;
}
  gl_FragColor = vec4(clamp(result, 0.0, 1.0), 1.0);
}
`;

const SilkPlane = forwardRef(function SilkPlane(
  { speed, scale, color, noiseIntensity, rotation, lightMode },
  ref
) {
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uLightMode: { value: lightMode ? 1 : 0 },
      uTime: { value: 0 }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width * 1.05, viewport.height * 1.05, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    if (ref.current && ref.current.material && ref.current.material.uniforms) {
      const u = ref.current.material.uniforms;
      u.uTime.value += 0.1 * delta;
      u.uSpeed.value = speed;
      u.uScale.value = scale;
      u.uNoiseIntensity.value = noiseIntensity;
      u.uColor.value.setRGB(...hexToNormalizedRGB(color));
      u.uRotation.value = rotation;
      u.uLightMode.value = lightMode ? 1 : 0;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
});
SilkPlane.displayName = 'SilkPlane';

const Silk = ({ speed = 5, scale = 1, color = '#101869', noiseIntensity = 1.5, rotation = 0, lightMode = false }) => {
  const meshRef = useRef();
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'never'}
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {inView && (
          <SilkPlane
            ref={meshRef}
            speed={speed}
            scale={scale}
            color={color}
            noiseIntensity={noiseIntensity}
            rotation={rotation}
            lightMode={lightMode}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Silk;
