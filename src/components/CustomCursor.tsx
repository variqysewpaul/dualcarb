"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Current mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Ring lags behind with lerp
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Reveal on first move (they start hidden via CSS opacity:0)
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = "1";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    const onHoverIn = () => {
      dotRef.current?.classList.add("hovered");
      ringRef.current?.classList.add("hovered");
    };
    const onHoverOut = () => {
      dotRef.current?.classList.remove("hovered");
      ringRef.current?.classList.remove("hovered");
    };

    const bindHoverables = () => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(animate);

    // Short delay so DOM is populated
    const timeout = setTimeout(bindHoverables, 500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
