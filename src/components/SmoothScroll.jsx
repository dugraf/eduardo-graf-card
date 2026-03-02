import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll
 * Wraps the app in a Lenis instance for a "buttery" scroll feel.
 * Uses a rAF loop so Lenis stays in sync with Framer Motion.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    let rafId;

    function frame(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
