"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  magneticStrength = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    
    // Check screen size - disable on mobile
    if (window.innerWidth < 768) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic boundary to avoid sticking when mouse is far away
    const distanceThreshold = width * 1.5; 
    const distance = Math.sqrt(middleX * middleX + middleY * middleY);

    if (distance < distanceThreshold) {
      setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
