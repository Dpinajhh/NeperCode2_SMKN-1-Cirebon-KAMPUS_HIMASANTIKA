import React, { useEffect, useRef, useCallback, useMemo } from "react";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = "",
  innerGradient = "transparent",
  behindGlowEnabled = true,
  behindGlowColor = "rgba(16, 24, 105, 0.2)",
  behindGlowSize = "60%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  name = "",
  title = "",
  handle = "",
  status = "",
  contactText = "",
  showUserInfo = false,
  showDetails = false,
  onContactClick,
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(
          Math.hypot(percentY - 50, percentX - 50) / 50,
          0,
          1
        )}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 6))}deg`,
        "--rotate-y": `${round(centerY / 5)}deg`,
      };

      for (const [k, v] of Object.entries(properties)) wrap.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar =
        Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      shell.classList.add("active");
      shell.classList.add("entering");
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", pointerEnterHandler => {});
      shell.removeEventListener("pointermove", pointerMoveHandler => {});
      shell.removeEventListener("pointerleave", pointerLeaveHandler => {});
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  const cardRadius = "28px";

  const cardStyle = useMemo(
    () => ({
      "--behind-glow-color": behindGlowColor,
      "--behind-glow-size": behindGlowSize,
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      "--pointer-from-center": "0",
      "--pointer-from-top": "0.5",
      "--pointer-from-left": "0.5",
      "--rotate-x": "0deg",
      "--rotate-y": "0deg",
      "--card-radius": cardRadius,
    }),
    [behindGlowColor, behindGlowSize, cardRadius]
  );

  const glareStyle = {
    transform: "translate3d(0, 0, 1.1px)",
    overflow: "hidden",
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      transparent 70%
    )`,
    mixBlendMode: "screen",
    zIndex: 4,
    gridArea: "1 / -1",
    borderRadius: cardRadius,
    pointerEvents: "none",
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{
        perspective: "600px",
        transform: "translate3d(0, 0, 0.1px)",
        ...cardStyle,
      }}
    >
      {behindGlowEnabled && (
        <div
          className="absolute -inset-4 z-0 pointer-events-none transition-opacity duration-300 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: "blur(40px)",
            opacity: 0.8,
          }}
        />
      )}
      <div ref={shellRef} className="relative z-[1] group h-full w-full">
        <section
          className="grid relative overflow-hidden backface-hidden w-full h-full"
          style={{
            minHeight: "340px",
            borderRadius: cardRadius,
            boxShadow:
              "0 20px 40px -15px rgba(16, 24, 105, 0.12), 0 0 0 1px rgba(226, 232, 240, 0.8)",
            transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            background: "#ffffff",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = "none";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transition =
              "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(0deg) rotateY(0deg)";
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: cardRadius,
              display: "grid",
              gridArea: "1 / -1",
            }}
          >
            {/* Glare layer */}
            <div style={glareStyle} />

            {/* Photo content in 100% natural, crisp color */}
            <div
              className="overflow-hidden relative w-full h-full"
              style={{
                gridArea: "1 / -1",
                borderRadius: cardRadius,
              }}
            >
              <img
                className="w-full h-full object-cover backface-hidden will-change-transform transition-transform duration-[120ms] ease-out"
                src={avatarUrl}
                alt={name || "Foto Bersama HIMASANTIKA"}
                loading="lazy"
                style={{
                  transformOrigin: "50% 50%",
                  transform:
                    "translateX(calc((var(--pointer-from-left) - 0.5) * 8px)) translateY(calc((var(--pointer-from-top) - 0.5) * 8px)) scale(1.04)",
                  borderRadius: cardRadius,
                }}
              />

              {showUserInfo && (
                <div
                  className="absolute z-[2] flex items-center justify-between backdrop-blur-md border border-white/20 pointer-events-auto"
                  style={{
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: "16px",
                    padding: "10px 14px",
                  }}
                >
                  <div className="flex flex-col items-start">
                    <div className="text-xs font-bold text-[#101869] leading-none">
                      @{handle}
                    </div>
                    <div className="text-[11px] text-[#525264] mt-1 leading-none">
                      {status}
                    </div>
                  </div>
                  {contactText && (
                    <button
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold bg-[#101869] text-white hover:bg-[#C3503B] transition-colors"
                      onClick={onContactClick}
                      type="button"
                    >
                      {contactText}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Optional Details Header */}
            {showDetails && name && (
              <div
                className="max-h-full overflow-hidden text-center relative z-[5]"
                style={{
                  gridArea: "1 / -1",
                  borderRadius: cardRadius,
                  pointerEvents: "none",
                }}
              >
                <div
                  className="w-full absolute flex flex-col"
                  style={{ top: "1.5rem" }}
                >
                  <h3 className="font-bold text-xl text-[#101869] m-0">
                    {name}
                  </h3>
                  {title && (
                    <p className="text-xs text-[#525264] mt-1">
                      {title}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
