"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState("powder");
  const btnRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cursor-tracked gradient inside the submit button
  const btnGradient = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}px ${y}px, #eab308 0%, #f97316 60%)`
  );

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <section
      id="waitlist"
      className="relative w-full overflow-hidden"
      style={{
        background: "#050505",
        padding: "clamp(5rem, 12vw, 12rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", padding: "5rem 0" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              style={{
                width: "80px",
                height: "80px",
                border: "1.5px solid #f97316",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2rem, 6vw, 4rem)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              You&apos;re on the list.
            </h3>
            <p style={{ color: "rgba(240,236,228,0.4)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Thanks for joining the fueling revolution. We&apos;ll be in touch as soon as the first test batch drops.
            </p>
          </motion.div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
              gap: "clamp(3rem, 6vw, 6rem)",
              alignItems: "start",
            }}
          >
            {/* Left: heading */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
              >
                <span style={{ display: "block", width: "2rem", height: "1px", background: "#f97316" }} />
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#f97316", fontWeight: 600 }}>
                  Pre-Order Access
                </span>
              </motion.div>

              <h2
                className="text-display"
                style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", marginBottom: "1.5rem" }}
              >
                <div>
                  <span className="clip-wrap">
                    <motion.span
                      style={{ display: "block" }}
                      initial={{ y: "110%", opacity: 0 }}
                      whileInView={{ y: "0%", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Join the
                    </motion.span>
                  </span>
                </div>
                <div>
                  <span className="clip-wrap">
                    <motion.span
                      style={{ display: "block" }}
                      initial={{ y: "110%", opacity: 0 }}
                      whileInView={{ y: "0%", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="text-gradient"
                    >
                      Rebellion.
                    </motion.span>
                  </span>
                </div>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                style={{ color: "rgba(240,236,228,0.35)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "34ch" }}
              >
                We&apos;re perfecting the formula. Help us finalize the format and be the first to know when we launch. No spam — ever.
              </motion.p>

              {/* Info strip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {[
                  "First to know about launch",
                  "Exclusive beta pricing",
                  "Shape the final format",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid #f97316",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(240,236,228,0.5)" }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: "0" }}
            >
              {/* Name field */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(240,236,228,0.3)",
                    marginBottom: "0.6rem",
                  }}
                >
                  First Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Eliud"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    padding: "0.8rem 0",
                    color: "#f0ece4",
                    fontSize: "1rem",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#f97316")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>

              {/* Email field */}
              <div style={{ marginBottom: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(240,236,228,0.3)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="eliud@kipchoge.com"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    padding: "0.8rem 0",
                    color: "#f0ece4",
                    fontSize: "1rem",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#f97316")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>

              {/* Format selector */}
              <div style={{ marginBottom: "2.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(240,236,228,0.3)",
                    marginBottom: "1rem",
                  }}
                >
                  Preferred Format
                </label>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {["Powder", "Liquid", "Gel"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      data-cursor-hover
                      onClick={() => setFormat(opt.toLowerCase())}
                      style={{
                        flex: 1,
                        padding: "0.7rem 0.5rem",
                        background: format === opt.toLowerCase() ? "rgba(249,115,22,0.15)" : "transparent",
                        border: format === opt.toLowerCase() ? "1px solid #f97316" : "1px solid rgba(255,255,255,0.1)",
                        color: format === opt.toLowerCase() ? "#f97316" : "rgba(240,236,228,0.4)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        cursor: "none",
                        transition: "all 0.2s",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button with cursor-tracked gradient */}
              <motion.button
                ref={btnRef}
                type="submit"
                data-cursor-hover
                onMouseMove={handleBtnMouseMove}
                disabled={loading}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                style={{
                  width: "100%",
                  padding: "1.1rem",
                  background: "#f97316",
                  color: "#000",
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "none",
                  position: "relative",
                  overflow: "hidden",
                  transition: "opacity 0.2s",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: btnGradient,
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  whileHover={{ opacity: 1 }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {loading ? "Securing your spot..." : "Get Early Access →"}
                </span>
              </motion.button>
            </motion.form>
          </div>
        )}
      </div>
    </section>
  );
}
