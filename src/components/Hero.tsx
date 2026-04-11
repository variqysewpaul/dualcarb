"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RunnerModel from "./RunnerModel";

// ── Clip-reveal word animation ─────────────────────────────────
function WordReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`clip-wrap ${className}`}>
      <motion.span
        style={{ display: "block" }}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax the 3D canvas upward as you scroll away
  const sachetY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: "#050505" }}
    >
      {/* ── Full-bleed 3D canvas — sits behind everything ───── */}
      <motion.div
        style={{ y: sachetY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* Left-side vignette: text area is dark, right side (sachet) stays visible */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #050505 18%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.1) 65%, transparent 100%)",
          }}
        />
        {/* Subtle top/bottom fade */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #050505 0%, transparent 12%, transparent 88%, #050505 100%)",
          }}
        />
        {/* Right-aligned container for the sachet */}
        <div className="absolute right-0 top-0 w-full md:w-[65%] h-full">
          <RunnerModel />
        </div>
      </motion.div>

      {/* ── Orange ambient glow ──────────────────────────────── */}
      <div
        className="absolute bottom-0 right-[25%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Main text content ────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full px-6 md:px-14 lg:px-20 pt-28 pb-12 flex flex-col justify-center"
      >
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span
            className="block w-8 h-px"
            style={{ background: "#f97316" }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.22em",
              color: "#f97316",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Formulated for South Africa
          </span>
        </motion.div>

        {/* Display Headline */}
        <h1
          className="text-display"
          style={{
            fontSize: "clamp(3.8rem, 10vw, 11rem)",
            maxWidth: "10ch",
          }}
        >
          <div>
            <WordReveal text="Elite" delay={0.2} />
          </div>
          <div>
            <WordReveal text="Fueling." className="text-outline" delay={0.35} />
          </div>
          <div style={{ display: "block" }}>
            <WordReveal
              text="Without"
              delay={0.5}
            />
          </div>
          <div>
            <WordReveal text="Elite" className="text-gradient" delay={0.65} />
          </div>
          <div>
            <WordReveal text="Pricing." delay={0.8} />
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.75rem, 1.1vw, 0.9rem)",
            color: "rgba(240,236,228,0.45)",
            letterSpacing: "0.06em",
            marginTop: "2rem",
            maxWidth: "38ch",
            lineHeight: 1.8,
          }}
        >
          DualCarb uses a science-backed{" "}
          <span style={{ color: "#f97316" }}>2:1 Maltodextrin:Fructose</span> system
          to unlock dual intestinal transporters — up to{" "}
          <span style={{ color: "#eab308" }}>90g of carbs /hr</span> with zero
          stomach distress, for half the price of imported brands.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <a
            href="#waitlist"
            data-cursor-hover
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.85rem 2.2rem",
              background: "#f97316",
              color: "#000",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              borderRadius: "0",
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#eab308";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f97316";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Join Waitlist
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#science"
            data-cursor-hover
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.85rem 2.2rem",
              border: "1px solid rgba(240,236,228,0.18)",
              color: "rgba(240,236,228,0.7)",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              borderRadius: "0",
              textDecoration: "none",
              background: "transparent",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.6)";
              (e.currentTarget as HTMLElement).style.color = "#f97316";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,236,228,0.18)";
              (e.currentTarget as HTMLElement).style.color = "rgba(240,236,228,0.7)";
            }}
          >
            The Science
          </a>
        </motion.div>

        {/* Stats bar — bottom editorial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center gap-6 mt-16"
        >
          {[
            { value: "30g", label: "Per Serving" },
            { value: "~R25", label: "Target Price" },
            { value: "90g/hr", label: "Max Absorption" },
            { value: "2:1", label: "Carb Ratio" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
                    color: i % 2 === 0 ? "#f97316" : "#eab308",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(240,236,228,0.35)",
                    marginTop: "0.3rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
              {i < 3 && (
                <div
                  style={{
                    width: "1px",
                    height: "32px",
                    background: "rgba(240,236,228,0.12)",
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-label="Scroll down"
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.3)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(249,115,22,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
