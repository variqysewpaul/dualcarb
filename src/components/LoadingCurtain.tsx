"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingCurtain() {
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger the slide up after 1.6s
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (!mounted || unmounted) return null;

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: done ? "-100vh" : "0%" }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (done) setUnmounted(true);
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        pointerEvents: done ? "none" : "all",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: done ? 0 : 1, y: done ? -8 : 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 1,
          color: "#f0ece4",
        }}
      >
        DUAL
        <span
          style={{
            WebkitTextStroke: "2px #f97316",
            color: "transparent",
          }}
        >
          CARB
        </span>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: done ? 0 : 1 }}
        transition={{ duration: 1.1, ease: "linear", delay: 0.1 }}
        style={{
          width: "120px",
          height: "1px",
          background: "linear-gradient(90deg, #f97316, #eab308)",
          transformOrigin: "left",
          marginTop: "0.5rem",
        }}
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 0 : 0.4 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#f0ece4",
        }}
      >
        Endurance Fuel
      </motion.span>
    </motion.div>
  );
}
