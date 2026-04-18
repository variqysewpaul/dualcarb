"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ScienceSection from "@/components/ScienceSection";
import WaitlistForm from "@/components/WaitlistForm";
import SectionBreak from "@/components/SectionBreak";
import FloatingSachet from "@/components/FloatingSachet";

// ── Scroll-aware Navbar ────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        padding: "1.25rem clamp(1.5rem, 5vw, 3.5rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        background: scrolled ? "rgba(5,5,5,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      {/* Logo */}
      <motion.a
        href="/"
        data-cursor-hover
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          fontFamily: "var(--font-outfit)",
          fontWeight: 900,
          fontSize: "1.15rem",
          letterSpacing: "-0.03em",
          textDecoration: "none",
          color: "#f0ece4",
          textTransform: "uppercase",
        }}
      >
        <span>DUAL</span>
        <span
          style={{
            WebkitTextStroke: "1.5px #f97316",
            color: "transparent",
          }}
        >
          CARB
        </span>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#f97316",
            animation: "pulse 2s infinite",
            marginLeft: "2px",
          }}
        />
      </motion.a>

      {/* Desktop nav links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
        className="hidden md:flex"
      >
        {[
          { label: "The Science", href: "#science" },
          { label: "Pre-Order", href: "#waitlist" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor-hover
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.5)",
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#f97316")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,236,228,0.5)")}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#waitlist"
          data-cursor-hover
          style={{
            padding: "0.55rem 1.4rem",
            background: "#f97316",
            color: "#000",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#eab308";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#f97316";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Join Waitlist
        </a>
      </motion.div>

      {/* Mobile hamburger */}
      <button
        className="flex flex-col md:hidden"
        data-cursor-hover
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          gap: "5px",
          background: "none",
          border: "none",
          cursor: "none",
          padding: "4px",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "22px",
              height: "1.5px",
              background: "#f0ece4",
              transition: "transform 0.3s, opacity 0.3s",
              transformOrigin: "center",
              transform:
                menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2
                    ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "scaleX(0)"
                  : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "rgba(5,5,5,0.96)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem clamp(1.5rem, 5vw, 3.5rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {[{ label: "The Science", href: "#science" }, { label: "Pre-Order", href: "#waitlist" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "1rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "rgba(240,236,228,0.7)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

// ── Product card ───────────────────────────────────────────────
function ProductCard({
  num,
  name,
  badge,
  badgeColor,
  description,
  textureUrl,
  delay = 0,
}: {
  num: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  textureUrl?: string;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor-hover
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.015)",
        padding: "0",
        overflow: "hidden",
        transition: "transform 0.15s ease",
        willChange: "transform",
      }}
    >
      {/* 3D sachet canvas area */}
      <div style={{ height: "260px", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 60%, ${badgeColor}18 0%, transparent 70%)`,
          }}
        />
        <FloatingSachet compact textureUrl={textureUrl} />
      </div>

      {/* Card body */}
      <div style={{ padding: "1.8rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "rgba(240,236,228,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            {num}
          </span>
          <span
            style={{
              padding: "0.25rem 0.7rem",
              background: `${badgeColor}18`,
              border: `1px solid ${badgeColor}40`,
              color: badgeColor,
              fontSize: "0.6rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
            }}
          >
            {badge}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
            marginBottom: "0.8rem",
          }}
        >
          {name}
        </h3>
        <p style={{ fontSize: "0.82rem", color: "rgba(240,236,228,0.4)", lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505" }}>
      <Navbar />
      <Hero />
      <SectionBreak label="The Science" chapterNum="02" />
      <ScienceSection />
      <SectionBreak label="Product Lineup" chapterNum="03" />

      {/* ── Product Lineup ──────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 5rem)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
          >
            <span style={{ display: "block", width: "2rem", height: "1px", background: "#eab308" }} />
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#eab308", fontWeight: 600, fontFamily: "var(--font-display)" }}>
              The Initial Drops
            </span>
          </motion.div>

          <h2
            className="text-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}
          >
            <span className="clip-wrap">
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Choose your
              </motion.span>
            </span>
            <br />
            <span className="clip-wrap">
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient"
              >
                weapon.
              </motion.span>
            </span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", gap: "1rem" }}>
            <ProductCard
              num="01"
              name="Very Berry — Stim-Free"
              badge="Clean Energy"
              badgeColor="#f97316"
              description="The pure performance base. 90g of carbs per serving, loaded with vital electrolytes. Drink it deep into ultra-endurance efforts without the jitters."
              textureUrl="/images/sachet-stim-free.jpg"
              delay={0}
            />
            <ProductCard
              num="02"
              name="Very Berry — Caffeinated"
              badge="Late-Race Surge"
              badgeColor="#eab308"
              description="When you need that late-race surge. Infused with 50mg of caffeine per serving. Designed to lower perceived exertion and reignite mental clarity."
              delay={0.15}
            />
          </div>
        </div>
      </section>

      <WaitlistForm />

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer
        style={{
          padding: "2.5rem clamp(1.5rem, 6vw, 5rem)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "0.85rem",
            letterSpacing: "-0.02em",
          }}
        >
          DUAL<span style={{ WebkitTextStroke: "1px #f97316", color: "transparent" }}>CARB</span>
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(240,236,228,0.25)", letterSpacing: "0.08em" }}>
            © {new Date().getFullYear()} Dual Carb Fuel. Designed in South Africa.
          </p>
          <p style={{ fontSize: "0.65rem", color: "rgba(240,236,228,0.15)" }}>
            Not affiliated with Maurten. But definitely cheaper.
          </p>
        </div>
      </footer>
    </main>
  );
}
