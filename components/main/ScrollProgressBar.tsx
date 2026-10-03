/** @format */

"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Tracks whole-page scroll progress (window/document, since no target is
// given) and smooths it with a spring so it reads as a fluid fill rather
// than a 1:1 jumpy tick with the scrollbar.
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] h-[3px] w-full bg-[#2c2640]/40">
      <motion.div
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-gradient-to-r from-[#7042f8] to-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6),0_0_6px_rgba(112,66,248,0.5)]"
      />
    </div>
  );
};

export default ScrollProgressBar;
