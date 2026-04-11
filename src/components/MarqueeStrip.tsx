"use client";

export default function MarqueeStrip() {
  const items = [
    "DUAL CARB",
    "90G / HR",
    "2:1 RATIO",
    "MADE IN SOUTH AFRICA",
    "ENDURANCE",
    "ZERO GI DISTRESS",
    "MALTODEXTRIN + FRUCTOSE",
    "R25 PER SERVING",
    "PERFORMANCE FUEL",
  ];

  const repeated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      style={{ background: "#f97316" }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              color: "#000",
              paddingRight: "2.5rem",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#000",
                marginLeft: "2.5rem",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
