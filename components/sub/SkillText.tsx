/** @format */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motion";

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        initial="hidden"
        animate="visible"
        className="text-center mb-3"
      >
        <h1 className="text-[40px] md:text-[48px] font-semibold text-gray-200">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Tech Stack
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        variants={slideInFromRight(0.5)}
        initial="hidden"
        animate="visible"
        className="text-gray-400 mt-3 text-center"
      >
        Technologies I use to build modern web applications, from frontend
        interfaces to backend services and cloud deployment.
      </motion.div>
    </div>
  );
};

export default SkillText;
