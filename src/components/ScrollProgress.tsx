"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgress — thin orange progress bar pinned to the very top of the viewport.
 * Fills left-to-right based on scroll position. Ubiquitous on Awwwards sites.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring physics makes the fill feel fluid and alive
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #f97316, #eab308)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 99997,
        pointerEvents: "none",
      }}
    />
  );
}
