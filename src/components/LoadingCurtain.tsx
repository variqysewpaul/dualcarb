"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingCurtain — full-screen intro reveal seen on virtually every Awwwards SOTD.
 * A black overlay with the brand name slides up after 1.4s, revealing the site beneath.
 */
export default function LoadingCurtain() {
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Start exit at 1.6s, fully remove from DOM at 2.8s (after animation completes)
    const t1 = setTimeout(() => setDone(true), 1600);
    const t2 = setTimeout(() => setUnmounted(true), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!mounted || unmounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="curtain"
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            pointerEvents: done ? "none" : "all", // Stop blocking mouse once exiting
          }}
        >
          {/* Brand logo in the curtain */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
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

          {/* Thin loading line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: "linear", delay: 0.1 }}
            style={{
              width: "120px",
              height: "1px",
              background: "linear-gradient(90deg, #f97316, #eab308)",
              transformOrigin: "left",
              marginTop: "0.5rem",
            }}
          />

          {/* Sub-label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
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
      )}
    </AnimatePresence>
  );
}
