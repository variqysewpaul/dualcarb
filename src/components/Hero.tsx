"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";

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

// ── Floating decoration element ────────────────────────────────
function FloatDot({
  size,
  color,
  style,
  delay = 0,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sachetRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const sachetY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const sachetScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // Mouse-tracking 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = ((e.clientX - cx) / (rect.width / 2)) * 12;
      const y = ((e.clientY - cy) / (rect.height / 2)) * -10;
      setTilt({ x, y });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const el = sectionRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    el?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el?.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      style={{ background: "#050505" }}
    >
      {/* ── Background radial glow layers ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "10%",
          top: "20%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "25%",
          bottom: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Left gradient fade ─────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #050505 28%, rgba(5,5,5,0.6) 48%, rgba(5,5,5,0.05) 70%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #050505 0%, transparent 8%, transparent 88%, #050505 100%)",
        }}
      />

      {/* ── Sachet — right side, CSS 3D parallax ──────────────── */}
      <motion.div
        style={{ y: sachetY, scale: sachetScale }}
        className="absolute right-0 top-[15%] md:top-0 w-full md:w-[58%] h-[85%] md:h-full flex items-center justify-center z-0 opacity-40 md:opacity-100"
        aria-hidden="true"
      >
        {/* Floating decorative dots behind sachet */}
        <FloatDot size={8} color="#f97316" style={{ top: "18%", left: "8%", opacity: 0.7 }} delay={0} />
        <FloatDot size={5} color="#eab308" style={{ top: "30%", right: "12%", opacity: 0.5 }} delay={1} />
        <FloatDot size={12} color="rgba(249,115,22,0.3)" style={{ bottom: "22%", left: "18%", opacity: 0.6, filter: "blur(2px)" }} delay={0.5} />
        <FloatDot size={6} color="#eab308" style={{ bottom: "35%", right: "20%", opacity: 0.4 }} delay={1.5} />

        {/* Hexagon grid accent (top-right) */}
        <motion.div
          animate={{ rotate: [0, 3, -3, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "8%",
            right: "5%",
            width: "160px",
            height: "160px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 18 L55 42 L30 55 L5 42 L5 18 Z' fill='none' stroke='%23f97316' stroke-width='0.8'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
            opacity: 0.08,
          }}
        />

        {/* Corner bracket decorations */}
        {[
          { top: "15%", left: "6%", rot: 0 },
          { top: "15%", right: "6%", rot: 90 },
          { bottom: "15%", left: "6%", rot: 270 },
          { bottom: "15%", right: "6%", rot: 180 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.1 }}
            style={{
              position: "absolute",
              width: "24px",
              height: "24px",
              borderTop: "1.5px solid rgba(249,115,22,0.35)",
              borderLeft: "1.5px solid rgba(249,115,22,0.35)",
              transform: `rotate(${pos.rot}deg)`,
              ...pos,
            }}
          />
        ))}

        {/* THE SACHET — CSS 3D tilt */}
        <motion.div
          ref={sachetRef}
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            perspective: "1200px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{
              rotateY: tilt.x,
              rotateX: tilt.y,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              willChange: "transform",
            }}
          >
            {/* Glow under sachet */}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                height: "60px",
                background: "radial-gradient(ellipse, rgba(249,115,22,0.35) 0%, transparent 70%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }}
            />
            <img
              src="/images/sachet-front.jpg"
              alt="DualCarb Endurance — Cotton Candy, Non-Caffeinated"
              style={{
                height: "clamp(320px, 50vh, 680px)",
                width: "auto",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 20px 60px rgba(249,115,22,0.25)) drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
                transform: "translateZ(40px)",
              }}
            />
            {/* Specular sheen overlay that tracks tilt */}
            <motion.div
              animate={{
                background: `radial-gradient(circle at ${50 + tilt.x * 2}% ${50 - tilt.y * 2}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                borderRadius: "4px",
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Main text content ────────────────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full px-6 md:px-14 lg:px-20 pt-32 pb-24 md:pb-16 flex flex-col justify-center min-h-screen"
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
            fontSize: "clamp(2.5rem, 9vw, 11rem)",
            maxWidth: "12ch",
          }}
        >
          <div>
            <WordReveal text="Elite" delay={0.1} />
          </div>
          <div>
            <WordReveal text="Fueling." className="text-outline" delay={0.2} />
          </div>
          <div style={{ display: "block" }}>
            <WordReveal
              text="Without"
              delay={0.3}
            />
          </div>
          <div>
            <WordReveal text="Elite" className="text-gradient" delay={0.4} />
          </div>
          <div>
            <WordReveal text="Pricing." delay={0.5} />
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
          <span style={{ color: "#f97316" }}>DualCarb Endurance™</span> formula
          to unlock dual intestinal transporters — up to{" "}
          <span style={{ color: "#eab308" }}>90g of carbs /hr</span> with zero
          stomach distress, for half the price of imported brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <MagneticButton>
            <a
              href="#contact"
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
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f97316";
              }}
            >
              Order Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </MagneticButton>
          <MagneticButton>
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
          </MagneticButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap items-center gap-4 md:gap-6 mt-12 md:mt-16"
        >
          {[
            { value: "30g", label: "Per Serving" },
            { value: "~R25", label: "Target Price" },
            { value: "90g/hr", label: "Max Absorption" },
            { value: "DC²", label: "Dual-Carb System" },
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
                  className="hidden md:block"
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

      {/* ── Scroll indicator ─────────────────────────────────────── */}
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
