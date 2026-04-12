"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RunnerModel from "./RunnerModel";

// ── Letter-by-letter stagger reveal (Awwwards standard) ────────
function LetterReveal({
  text,
  className = "",
  delay = 0,
  color,
  outline = false,
  gradient = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  color?: string;
  outline?: boolean;
  gradient?: boolean;
}) {
  const letters = text.split("");
  return (
    <span
      className={`clip-wrap inline-flex ${className}`}
      style={{ overflow: "visible" }}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: letter === " " ? "pre" : undefined,
            ...(outline
              ? { WebkitTextStroke: "1.5px rgba(240,236,228,0.5)", color: "transparent" }
              : gradient
              ? {}
              : color
              ? { color }
              : {}),
          }}
          className={gradient ? "text-gradient" : ""}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

// ── Magnetic button — attracts toward cursor on hover ──────────
function MagneticButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (btnRef.current) {
      btnRef.current.style.transform = "translate(0,0)";
    }
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      data-cursor-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.9rem 2.4rem",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "0.8rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        textDecoration: "none",
        borderRadius: "0",
        transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1), background 0.2s, color 0.2s, border-color 0.2s",
        willChange: "transform",
        ...(primary
          ? { background: "#f97316", color: "#000", border: "1px solid #f97316" }
          : {
              background: "transparent",
              color: "rgba(240,236,228,0.7)",
              border: "1px solid rgba(240,236,228,0.18)",
            }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (primary) {
          el.style.background = "#eab308";
          el.style.borderColor = "#eab308";
        } else {
          el.style.borderColor = "rgba(249,115,22,0.6)";
          el.style.color = "#f97316";
        }
      }}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sachetY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: "#050505" }}
    >
      {/* ── Full-bleed 3D canvas ──────────────────────────────── */}
      <motion.div
        style={{ y: sachetY }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #050505 18%, rgba(5,5,5,0.55) 40%, rgba(5,5,5,0.1) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #050505 0%, transparent 12%, transparent 88%, #050505 100%)",
          }}
        />
        <div className="absolute right-0 top-0 w-full md:w-[65%] h-full">
          <RunnerModel />
        </div>
      </motion.div>

      {/* ── Orange ambient glow ───────────────────────────────── */}
      <div
        className="absolute bottom-0 right-[25%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Main text content ─────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full px-6 md:px-14 lg:px-20 pt-28 pb-12 flex flex-col justify-center"
      >
        {/* Pre-label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="block w-8 h-px" style={{ background: "#f97316" }} />
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

        {/* Display Headline — letter-by-letter stagger */}
        <h1
          className="text-display"
          style={{ fontSize: "clamp(3.8rem, 10vw, 11rem)", maxWidth: "10ch", overflow: "hidden" }}
        >
          <div><LetterReveal text="Elite" delay={0.3} /></div>
          <div><LetterReveal text="Fueling." delay={0.5} outline /></div>
          <div><LetterReveal text="Without" delay={0.72} /></div>
          <div><LetterReveal text="Elite" delay={0.94} gradient /></div>
          <div><LetterReveal text="Pricing." delay={1.14} /></div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
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

        {/* CTA Row — magnetic buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <MagneticButton href="#waitlist" primary>
            Join Waitlist
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#science">
            The Science
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
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

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
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
