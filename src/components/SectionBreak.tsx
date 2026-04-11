"use client";

import { motion } from "framer-motion";

/**
 * SectionBreak — a full-width editorial chapter divider.
 * Uses a thin rule + centred section label + large ghost number.
 * Far more refined than a moving ticker strip.
 */
export default function SectionBreak({
  label,
  chapterNum,
}: {
  label: string;
  chapterNum: string;
}) {
  return (
    <div
      role="separator"
      aria-label={label}
      style={{
        position: "relative",
        width: "100%",
        padding: "0 clamp(1.5rem, 6vw, 5rem)",
        overflow: "hidden",
      }}
    >
      {/* Ghost chapter number — sits in the background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(6rem, 20vw, 18rem)",
          lineHeight: 1,
          letterSpacing: "-0.06em",
          color: "rgba(255,255,255,0.025)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {chapterNum}
      </motion.div>

      {/* Rule + label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "4rem 0",
        }}
      >
        {/* Left rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            transformOrigin: "left",
          }}
        />

        {/* Centre label */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.25)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </motion.span>

        {/* Right rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            flex: 1,
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            transformOrigin: "right",
          }}
        />
      </div>
    </div>
  );
}
