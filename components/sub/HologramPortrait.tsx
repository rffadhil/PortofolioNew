/** @format */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = ["Rafi Fadhil Amanullah"];

export default function HologramPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="relative w-[650px] h-[650px] flex items-center justify-center overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute w-[380px] h-[380px] rounded-full bg-purple-600/15 blur-[70px]" />

      {/* Orbit 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="absolute w-[480px] h-[480px] rounded-full border-2 border-purple-400/25 shadow-[0_0_35px_rgba(168,85,247,0.35)]"
      />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      {/* Orbit 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        className="absolute w-[360px] h-[360px] rounded-full border border-cyan-400/25 shadow-[0_0_25px_rgba(34,211,238,0.25)]"
      />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-cyan-400/5 blur-2xl" />

      {/* Floating Card */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="relative translate-x-20"
      >
        {/* Frame */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-purple-400" />

          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-purple-400" />

          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-purple-400" />

          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-400" />
        </div>

        {/* Portrait */}
        <div className="relative w-[320px] h-[420px] overflow-hidden rounded-[36px] border border-purple-500/40 shadow-[0_0_35px_rgba(139,92,246,.35)]">
          <Image
            src="/profile.jpg"
            alt="Rafi Fadhil"
            fill
            className="object-cover"
          />

          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: [0, 418, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-full h-[3px] z-20"
          >
            <div className="h-full bg-cyan-300" />
            <div className="absolute inset-0 blur-md bg-cyan-300 opacity-70" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-transparent to-transparent" />

          <div className="absolute inset-0 bg-purple-500/10" />
        </div>

        {/* Online Badge */}
        <div className="absolute -top-5 right-0 z-50 bg-[#090414]/90 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

            <p className="text-xs tracking-widest text-white">ONLINE</p>
          </div>
        </div>

        {/* Tech */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 w-[320px]">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full border border-purple-500/20 bg-white/5 backdrop-blur-md text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
