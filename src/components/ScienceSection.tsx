"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Zap, Activity } from "lucide-react";

// ── Animated counter ────────────────────────────────────────
function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── Word reveal reused from Hero ────────────────────────────
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
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ── Animated counter bar ────────────────────────────────────
function BarStat({
  label,
  value,
  percent,
  color,
  delay = 0,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{ marginBottom: "1.6rem" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.4)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.9rem",
            color,
          }}
        >
          {value}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "2px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", background: color, borderRadius: "2px" }}
        />
      </div>
    </motion.div>
  );
}

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="science"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── Watermark ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(10rem, 30vw, 30rem)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.016)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        SCIENCE
      </div>

      <div className="relative z-10">
        {/* ── Header ─────────────────────────────────────────── */}
        <div
          style={{
            padding: "0.5rem clamp(1.5rem, 6vw, 5rem) 0",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ display: "block", width: "2rem", height: "1px", background: "#eab308" }} />
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#eab308",
                fontWeight: 600,
              }}
            >
              Biochemistry
            </span>
          </motion.div>

          <h2
            className="text-display"
            style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
          >
            <div><WordReveal text="The" delay={0} /></div>
            <div>
              <WordReveal text="Science" className="text-gradient" delay={0.15} />
            </div>
            <div><WordReveal text="of Speed." delay={0.3} /></div>
          </h2>
        </div>

        {/* ── Split: Bio-bars + Cards ────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
            gap: "0",
            padding: "clamp(1.5rem, 4vw, 4rem) 0",
          }}
        >
          {/* Left — big stat + performance bars */}
          <div
            className="border-b md:border-b-0 md:border-r border-white/5"
            style={{
              padding: "clamp(2rem, 5vw, 5rem) clamp(1.5rem, 6vw, 5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ marginBottom: "3rem" }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(240,236,228,0.35)",
                  lineHeight: 1.7,
                  maxWidth: "34ch",
                }}
              >
                By engaging two separate intestinal transporters simultaneously, we bypass the single-pathway bottleneck that caps standard gels at 60g/hr.
              </p>
            </motion.div>

            <BarStat label="Standard Glucose Gel" value="60g/hr" percent={67} color="rgba(255,255,255,0.15)" delay={0.1} />
            <BarStat label="DualCarb Endurance" value="~90g/hr" percent={100} color="#f97316" delay={0.25} />
            <BarStat label="Competitor Premium (Maurten)" value="~60g/hr" percent={67} color="rgba(255,255,255,0.1)" delay={0.4} />
          </div>

          {/* Right — feature cards */}
          <div style={{ padding: "clamp(2rem, 5vw, 5rem) clamp(1.5rem, 6vw, 5rem)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                icon: <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "20px", height: "20px" }}>
                    <path d="M12 2L19 6V18L12 22L5 18V6L12 2Z" />
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="6" r="1.5" />
                    <circle cx="17" cy="9" r="1.5" />
                    <circle cx="17" cy="15" r="1.5" />
                    <circle cx="12" cy="18" r="1.5" />
                    <circle cx="7" cy="15" r="1.5" />
                    <circle cx="7" cy="9" r="1.5" />
                  </svg>
                </div>,
                color: "#f97316",
                heading: "Dual-Carb Absorption",
                body: "Our precision 2:1 Maltodextrin to Fructose ratio recruits both SGLT1 and GLUT5 transporters, bypassing the 60g/hr bottleneck of standard single-source gels.",
              },
              {
                icon: <Zap size={18} />,
                color: "#eab308",
                heading: "Fast Energy",
                body: "Rapid-clearance carbohydrates provide an immediate glycogen surge. Designed for high-intensity efforts where every millisecond of energy delivery counts.",
              },
              {
                icon: <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "20px", height: "20px" }}>
                    <path d="M12 22C12 22 20 18 20 12C20 6 15 2 12 2C9 2 4 6 4 12C4 18 12 22 12 22Z" />
                    <path d="M9 12L11 14L15 10" />
                  </svg>
                </div>,
                color: "#f97316",
                heading: "Gentle on Stomach",
                body: "By splitting the osmotic load across two pathways, we eliminate the 'sloshing' and GI distress common with high-dose glucose gels. Performance without the pain.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ x: 6 }}
                data-cursor-hover
                style={{
                  padding: "1.8rem 2rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `3px solid ${card.color}`,
                  background: "rgba(255,255,255,0.015)",
                  backdropFilter: "blur(10px)",
                  cursor: "default",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${card.color}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.015)";
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      minWidth: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${card.color}40`,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "1rem",
                        letterSpacing: "0.04em",
                        color: "#f0ece4",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {card.heading}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "rgba(240,236,228,0.45)", lineHeight: 1.7 }}>
                      {card.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Comparison Table ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            margin: "0 clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 8rem)",
            border: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.4rem 2rem",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.02)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              The Market Reality
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Brand", "Carb Load", "Fuel System", "Est. Retail"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "1rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.6rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(240,236,228,0.3)",
                        fontWeight: 600,
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { brand: "Maurten Gel 100", carb: "25g", system: "Dual carb hydrogel", price: "R70–R100", highlight: false },
                  { brand: "GU Energy Gel", carb: "23g", system: "Glucose + Fructose", price: "R45–R60", highlight: false },
                  { brand: "SiS GO Gel", carb: "22g", system: "Isotonic Maltodextrin", price: "R40–R55", highlight: false },
                  { brand: "DualCarb Endurance", carb: "30g", system: "Proprietary Dual-Carb Blend", price: "R25–R30", highlight: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderLeft: row.highlight ? "3px solid #f97316" : "3px solid transparent",
                      background: row.highlight ? "rgba(249,115,22,0.05)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    <td
                      style={{
                        padding: "1.2rem 1.5rem",
                        fontSize: "0.88rem",
                        fontWeight: row.highlight ? 800 : 400,
                        color: row.highlight ? "#f0ece4" : "rgba(240,236,228,0.5)",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                      }}
                    >
                      {row.highlight && (
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#f97316", display: "inline-block", flexShrink: 0, animation: "pulse 2s infinite" }} />
                      )}
                      {row.brand}
                    </td>
                    <td style={{ padding: "1.2rem 1.5rem", fontSize: "0.88rem", color: row.highlight ? "#f97316" : "rgba(240,236,228,0.45)", fontWeight: row.highlight ? 800 : 400, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.carb}</td>
                    <td style={{ padding: "1.2rem 1.5rem", fontSize: "0.88rem", color: row.highlight ? "#f97316" : "rgba(240,236,228,0.45)", fontWeight: row.highlight ? 700 : 400, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.system}</td>
                    <td style={{ padding: "1.2rem 1.5rem", fontSize: "0.88rem", color: row.highlight ? "#eab308" : "rgba(240,236,228,0.45)", fontWeight: row.highlight ? 800 : 400, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ── Product Anatomy (New Design) ───────────────────── */}
      <div
        style={{
          padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Label + Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                top: "-10%",
                left: "-5%",
                width: "110%",
                height: "110%",
                background: "radial-gradient(circle at center, #f9731610 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: -1,
              }}
            />
            <img
              src="/images/sachet-stim-free.jpg"
              alt="DualCarb Stim-Free Sachet Design"
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            />
          </motion.div>

          {/* Breakdown Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-display"
                style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}
              >
                Engineered <br /> <span className="text-gradient">Precision.</span>
              </h3>
              <p style={{ color: "rgba(240,236,228,0.45)", lineHeight: 1.8, marginBottom: "2rem" }}>
                Every element of the DualCarb sachet is designed for high-intensity endurance. From the 30g carb dosing to the high-contrast typography, we ensure you can read and access your fuel even at your physical limit.
              </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {[
                { label: "Carbs", val: "30g" },
                { label: "Caffeine", val: "0mg" },
                { label: "System", val: "DC²" },
                { label: "Design", val: "V2.0" },
              ].map((pill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  style={{
                    padding: "1rem",
                    border: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,255,255,0.02)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(240,236,228,0.25)", marginBottom: "0.3rem" }}>{pill.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#f97316" }}>{pill.val}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
