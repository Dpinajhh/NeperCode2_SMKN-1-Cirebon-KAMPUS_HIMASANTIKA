"use client";

import { useEffect, useRef, useCallback, useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const TargetCursor = ({
  targetSelector = ".cursor-target",
  containerSelector = "#kegiatan",
  spinDuration = 2,
  hoverDuration = 0.25,
  parallaxOn = true,
  cursorColor = "#101869",
  cursorColorOnTarget = "#C3503B",
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef(null);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isActiveRef = useRef(false);
  const isInsideContainerRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 16,
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.08,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!mounted || isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");

    let activeTarget = null;
    let currentLeaveHandler = null;
    let resumeTimeout = null;

    const cleanupTarget = (target) => {
      if (currentLeaveHandler && target) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    // Initially hidden until inside section
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
      scale: 0.8,
    });

    const createSpinTimeline = () => {
      if (spinTl.current) {
        spinTl.current.kill();
      }
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });
    };

    createSpinTimeline();

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }
      const strength = activeStrengthRef.current;
      if (strength === 0) return;
      const cursorX = gsap.getProperty(cursorRef.current, "x");
      const cursorY = gsap.getProperty(cursorRef.current, "y");
      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, "x");
        const currentY = gsap.getProperty(corner, "y");
        const targetX = targetCornerPositionsRef.current[i].x - cursorX;
        const targetY = targetCornerPositionsRef.current[i].y - cursorY;
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? "none" : "power1.out",
          overwrite: "auto",
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = (e) => {
      moveCursor(e.clientX, e.clientY);

      // Check if mouse is inside the container
      const container = document.querySelector(containerSelector);
      if (container) {
        const rect = container.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (inside && !isInsideContainerRef.current) {
          isInsideContainerRef.current = true;
          gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
        } else if (!inside && isInsideContainerRef.current) {
          isInsideContainerRef.current = false;
          gsap.to(cursor, { opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.out" });
        }
      }
    };
    window.addEventListener("mousemove", moveHandler);

    const scrollHandler = () => {
      const cursorX = gsap.getProperty(cursorRef.current, "x");
      const cursorY = gsap.getProperty(cursorRef.current, "y");
      const container = document.querySelector(containerSelector);

      if (container) {
        const rect = container.getBoundingClientRect();
        const inside =
          cursorX >= rect.left &&
          cursorX <= rect.right &&
          cursorY >= rect.top &&
          cursorY <= rect.bottom;

        if (inside && !isInsideContainerRef.current) {
          isInsideContainerRef.current = true;
          gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
        } else if (!inside && isInsideContainerRef.current) {
          isInsideContainerRef.current = false;
          gsap.to(cursor, { opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.out" });
        }
      }

      if (!activeTarget || !cursorRef.current) return;
      const elementUnderMouse = document.elementFromPoint(cursorX, cursorY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget && currentLeaveHandler) {
        currentLeaveHandler();
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    const mouseDownHandler = () => {
      if (!dotRef.current || !isInsideContainerRef.current) return;
      gsap.to(dotRef.current, { scale: 0.6, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 0.85, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current || !isInsideContainerRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e) => {
      if (!isInsideContainerRef.current) return;

      const directTarget = e.target;
      let current = directTarget;
      let target = null;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          target = current;
          break;
        }
        current = current.parentElement;
      }

      if (!target || !cursorRef.current || !cornersRef.current) return;
      if (activeTarget === target) return;
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;
      const corners = Array.from(cornersRef.current);
      corners.forEach((corner) => gsap.killTweensOf(corner, "x,y"));
      gsap.killTweensOf(cursorRef.current, "rotation");
      spinTl.current?.pause();
      gsap.set(cursorRef.current, { rotation: 0 });

      if (cursorColorOnTarget) {
        gsap.to(corners, {
          borderColor: cursorColorOnTarget,
          duration: 0.15,
          ease: "power2.out",
        });
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: cursorColorOnTarget,
            duration: 0.15,
            ease: "power2.out",
          });
        }
      }

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;
      const cursorX = gsap.getProperty(cursorRef.current, "x");
      const cursorY = gsap.getProperty(cursorRef.current, "y");

      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize },
      ];

      isActiveRef.current = true;
      gsap.ticker.add(tickerFnRef.current);

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out",
      });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current[i].x - cursorX,
          y: targetCornerPositionsRef.current[i].y - cursorY,
          duration: 0.25,
          ease: "power2.out",
        });
      });

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);
        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
        activeTarget = null;

        if (cursorColorOnTarget && cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), {
            borderColor: cursorColor,
            duration: 0.15,
            ease: "power2.out",
          });
          if (dotRef.current) {
            gsap.to(dotRef.current, {
              backgroundColor: cursorColor,
              duration: 0.15,
              ease: "power2.out",
            });
          }
        }

        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners, "x,y");
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];
          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }
        resumeTimeout = setTimeout(() => {
          if (!activeTarget && cursorRef.current && spinTl.current) {
            const currentRotation = gsap.getProperty(cursorRef.current, "rotation");
            const normalizedRotation = currentRotation % 360;
            spinTl.current.kill();
            spinTl.current = gsap
              .timeline({ repeat: -1 })
              .to(cursorRef.current, {
                rotation: "+=360",
                duration: spinDuration,
                ease: "none",
              });
            gsap.to(cursorRef.current, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                spinTl.current?.restart();
              },
            });
          }
          resumeTimeout = null;
        }, 50);
        cleanupTarget(target);
      };
      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }
      spinTl.current?.kill();
      isActiveRef.current = false;
      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [
    targetSelector,
    containerSelector,
    spinDuration,
    moveCursor,
    constants,
    isMobile,
    hoverDuration,
    parallaxOn,
    cursorColor,
    cursorColorOnTarget,
    mounted,
  ]);

  if (!mounted || isMobile || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[99999]"
      style={{ willChange: "transform", opacity: 0 }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm"
        style={{ willChange: "transform", backgroundColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-4 h-4 border-[3px] -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0 rounded-tl-sm shadow-sm"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-4 h-4 border-[3px] translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0 rounded-tr-sm shadow-sm"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-4 h-4 border-[3px] translate-x-1/2 translate-y-1/2 border-l-0 border-t-0 rounded-br-sm shadow-sm"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-4 h-4 border-[3px] -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0 rounded-bl-sm shadow-sm"
        style={{ willChange: "transform", borderColor: cursorColor }}
      />
    </div>,
    document.body
  );
};

export default TargetCursor;
