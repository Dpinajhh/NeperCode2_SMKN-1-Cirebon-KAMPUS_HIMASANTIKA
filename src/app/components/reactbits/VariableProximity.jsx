import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(',')
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(' ');
            return [name.replace(/['"]/g, ''), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = useCallback((distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case 'exponential':
        return norm ** 2;
      case 'gaussian':
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      case 'linear':
      default:
        return norm;
    }
  }, [radius, falloff]);

  // Cached centers of each letter relative to container
  const letterCentersRef = useRef([]);

  const measureLetters = useCallback(() => {
    if (!containerRef?.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    letterCentersRef.current = letterRefs.current.map((letterRef) => {
      if (!letterRef) return null;
      const rect = letterRef.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    });
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    let rafId = null;
    let isInside = false;

    const updateLetters = (mouseX, mouseY) => {
      const centers = letterCentersRef.current;
      if (!centers.length) measureLetters();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const center = letterCentersRef.current[index];
        if (!center) return;

        const distance = calculateDistance(mouseX, mouseY, center.x, center.y);

        if (distance >= radius) {
          if (letterRef.style.fontVariationSettings !== fromFontVariationSettings) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
          }
          return;
        }

        const falloffValue = calculateFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(', ');

        letterRef.style.fontVariationSettings = newSettings;
      });
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const isNear =
        e.clientX >= rect.left - 100 &&
        e.clientX <= rect.right + 100 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100;

      if (!isNear) {
        if (isInside) {
          isInside = false;
          letterRefs.current.forEach((letterRef) => {
            if (letterRef) letterRef.style.fontVariationSettings = fromFontVariationSettings;
          });
        }
        return;
      }

      isInside = true;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateLetters(mouseX, mouseY));
    };

    const handleResize = () => {
      measureLetters();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef, fromFontVariationSettings, parsedSettings, radius, calculateFalloff, measureLetters]);

  const words = label.split(' ');
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: 'var(--font-roboto-flex), "Roboto Flex", sans-serif',
        ...style
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map(letter => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={el => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
