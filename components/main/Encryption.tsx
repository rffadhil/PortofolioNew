/** @format */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/motion";
import Image from "next/image";

const Encryption = () => {
  const education = [
    {
      title: "Universitas Pamulang",
      subtitle: "Informatics Engineering",
      period: "2024 — Present",
      logo: "logounpam.jpeg",
    },
    {
      title: "SMK VIP Al-Huda",
      subtitle: "Electronic Automotive Engineering",
      period: "2021 — 2024",
      logo: "logosmk.jpeg",
    },
  ];

  const experience = [
    {
      title: "Coding Camp powered by DBS Foundation",
      subtitle: "Full-Stack Web Developer Cohort",
      period: "Feb 2026 — Aug 2026",
      logo: "codingcamp.jpeg",
    },
    {
      title: "Asah led by Dicoding",
      subtitle: "Front-End & Back-End with AI Cohort",
      period: "Aug 2025 — Feb 2026",
      logo: "asah.jpeg",
    },
    {
      title: "PT Reska Multi Usaha (KAI Service)",
      subtitle: "Train Service Support",
      period: "Mar 2026 — Apr 2026",
      logo: "kaiservices.jpeg",
    },
    {
      title: "Bengkel Mobil Sumber Waras",
      subtitle: "Operational Assistant",
      period: "Sep 2023 — Dec 2023",
      logo: "bengkel.jpg",
    },
    {
      title: "Palang Merah Remaja",
      subtitle: "Secretary",
      period: "Sep 2021 — Aug 2023",
      logo: "pmr.jpeg",
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 lg:px-10 py-20"
    >
      {/* Title */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <h1 className="text-[40px] md:text-[48px] font-semibold text-gray-200">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Journey
          </span>
        </h1>

        <p className="text-gray-400 mt-3">
          A glimpse of my education and professional journey
        </p>
      </motion.div>

      {/* Content */}
      <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Education */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-5">
            Education
          </h2>

          <div className="flex flex-col gap-5">
            {education.map((item) => (
              <div
                key={item.title}
                className="group flex items-center gap-5 p-6 rounded-xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(112,66,248,0.3)]"
              >
                {/* Logo Slot */}
                <div className="w-[60px] h-[60px] shrink-0 rounded-lg border border-[#7042f861] bg-[#0b061b] flex items-center justify-center overflow-hidden">
                  <Image
                    src={`/${item.logo}`}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">{item.subtitle}</p>

                  <p className="text-purple-400 text-sm mt-2">{item.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-200 mb-5">
            Experience
          </h2>

          {/* Scroll Container */}
          <div className="experience-scroll h-[360px] overflow-y-scroll pr-3">
            <div className="flex flex-col gap-4">
              {experience.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center gap-5 p-5 rounded-xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]"
                >
                  {/* Logo Slot */}
                  <div className="w-[55px] h-[55px] shrink-0 rounded-lg border border-[#7042f861] bg-[#0b061b] flex items-center justify-center overflow-hidden">
                    <Image
                      src={`/${item.logo}`}
                      alt={item.title}
                      width={55}
                      height={55}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-200">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {item.subtitle}
                    </p>

                    <p className="text-cyan-400 text-sm mt-2">{item.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Encryption;
