"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ScienceSection from "@/components/ScienceSection";
import SectionBreak from "@/components/SectionBreak";

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
          { label: "Order", href: "#contact" },
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
          href="#contact"
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
          Order Now
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
          {[{ label: "The Science", href: "#science" }, { label: "Order", href: "#contact" }].map((link) => (
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
  comingSoon = false,
  delay = 0,
}: {
  num: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  textureUrl?: string;
  comingSoon?: boolean;
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
      {/* Product visual area — static image with CSS 3D hover */}
      <div style={{
        height: "260px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 60%, ${badgeColor}18 0%, transparent 70%)`,
          }}
        />
        {textureUrl ? (
          <img
            src={textureUrl}
            alt={name}
            style={{
              height: "85%",
              width: "auto",
              objectFit: "contain",
              position: "relative",
              zIndex: 1,
              filter: comingSoon ? "drop-shadow(0 8px 24px rgba(0,0,0,0.5)) grayscale(0.3) brightness(0.6)" : "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
              transition: "transform 0.4s ease",
            }}
          />
        ) : (
          <div style={{
            width: "100px",
            height: "160px",
            background: "linear-gradient(135deg, #0a0a0a, #1a1a1a)",
            border: "1px solid rgba(234,179,8,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.7rem", color: "#eab308", letterSpacing: "0.1em" }}>DC²</span>
          </div>
        )}
        {/* Coming Soon overlay */}
        {comingSoon && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,5,5,0.55)",
            backdropFilter: "blur(3px)",
            zIndex: 2,
            gap: "0.5rem",
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.1rem", color: "#eab308", letterSpacing: "0.1em", textTransform: "uppercase" }}>Coming Soon</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(240,236,228,0.4)", letterSpacing: "0.12em" }}>Stay tuned</span>
          </div>
        )}
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
    <main id="main-scroll" style={{ background: "#050505" }}>
      <Navbar />

      {/* Hero */}
      <div style={{ scrollSnapAlign: "start" }}>
        <Hero />
      </div>

      {/* Science */}
      <div style={{ scrollSnapAlign: "start" }}>
        <SectionBreak label="The Science" chapterNum="02" />
        <ScienceSection />
      </div>

      {/* Product Lineup */}
      <div style={{ scrollSnapAlign: "start" }}>
        <SectionBreak label="Product Lineup" chapterNum="03" />
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
                The Lineup
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
                name="Cotton Candy — Stim-Free"
                badge="Clean Energy"
                badgeColor="#f97316"
                description="The pure performance base. 30g of carbs per sachet, loaded with vital electrolytes. Cotton Candy flavoured. Drink it deep into ultra-endurance efforts without the jitters."
                textureUrl="/images/sachet-front.jpg"
                delay={0}
              />
              <ProductCard
                num="02"
                name="Caffeinated Blend"
                badge="Coming Soon"
                badgeColor="#eab308"
                description="Late-race surge with 50mg of caffeine per serving. Designed to lower perceived exertion and reignite mental clarity. Coming soon."
                comingSoon
                delay={0.15}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── Contact / Order Section ───────────────────────── */}
      <div style={{ scrollSnapAlign: "start" }}>
        <section
          id="contact"
          style={{
            background: "#050505",
            padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 5rem)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div aria-hidden="true" style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
              <span style={{ display: "block", width: "2rem", height: "1px", background: "#f97316" }} />
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#f97316", fontWeight: 600, fontFamily: "var(--font-display)" }}>How to Order</span>
            </motion.div>
            <h2 className="text-display" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "1rem" }}>
              <span className="clip-wrap">
                <motion.span style={{ display: "block" }} initial={{ y: "110%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>Contact your</motion.span>
              </span>
              <span className="clip-wrap">
                <motion.span style={{ display: "block" }} initial={{ y: "110%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }} className="text-gradient">local rep.</motion.span>
              </span>
            </h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }} style={{ color: "rgba(240,236,228,0.4)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "44ch", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              We currently operate through local representatives. Reach out directly via phone or email to place your order — we&apos;ll sort you out.
            </motion.p>

            {/* Region Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", gap: "1.5rem" }}>
              {[
                {
                  region: "DualCarb Durban",
                  color: "#f97316",
                  contacts: [
                    { name: "Variq Sewpaul", phone: "083 206 1260", email: "sewpaulvariq@gmail.com" },
                  ],
                },
                {
                  region: "DualCarb Newcastle",
                  color: "#eab308",
                  contacts: [
                    { name: "Vino Sewpaul", phone: "083 206 1260", email: "vinosewpaul@gmail.com" },
                    { name: "Nibha Sewpaul", phone: "081 020 6635", email: null },
                  ],
                },
                {
                  region: "DualCarb Johannesburg",
                  color: "#f97316",
                  contacts: [
                    { name: "Naomi Mareno", phone: "084 455 2900", email: "naomimareno05@gmail.com" },
                  ],
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  style={{
                    border: `1px solid ${card.color}25`,
                    background: `linear-gradient(135deg, ${card.color}06 0%, transparent 60%)`,
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Corner accent */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "40px", background: card.color }} />
                  <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "3px", background: card.color }} />

                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: card.color, marginBottom: "1.2rem" }}>
                    {card.region}
                  </div>

                  {card.contacts.map((c, j) => (
                    <div key={j} style={{ marginBottom: j < card.contacts.length - 1 ? "1.5rem" : 0, paddingBottom: j < card.contacts.length - 1 ? "1.5rem" : 0, borderBottom: j < card.contacts.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "#f0ece4", marginBottom: "0.8rem" }}>{c.name}</div>
                      <a href={`tel:${c.phone.replace(/\s/g, "")}`} data-cursor-hover style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(240,236,228,0.5)", textDecoration: "none", fontSize: "0.88rem", marginBottom: "0.5rem", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = card.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.5)")}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                        {c.phone}
                      </a>
                      {c.email && (
                        <a href={`mailto:${c.email}`} data-cursor-hover style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "rgba(240,236,228,0.5)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = card.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,236,228,0.5)")}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          {c.email}
                        </a>
                      )}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Sachet back image (nutrition info) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ marginTop: "5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))", gap: "4rem", alignItems: "center" }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#f97316", marginBottom: "1rem" }}>What&apos;s Inside</div>
                <h3 className="text-display" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.2rem" }}>Transparent.<br /><span className="text-gradient">Every gram.</span></h3>
                <p style={{ color: "rgba(240,236,228,0.4)", lineHeight: 1.8, fontSize: "0.88rem" }}>No hidden ingredients. No proprietary blends you can&apos;t read. Full nutritional information printed on every sachet — because you deserve to know what fuels your body.</p>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle at center, rgba(249,115,22,0.08) 0%, transparent 70%)", filter: "blur(30px)" }} />
                <img src="/images/sachet-back.jpg" alt="DualCarb Nutritional Information" style={{ width: "100%", maxWidth: "420px", height: "auto", display: "block", margin: "0 auto", filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.5))", position: "relative" }} />
              </div>
            </motion.div>
          </div>
        </section>
      </div>

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
