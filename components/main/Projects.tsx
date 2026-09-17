/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromTop, slideInFromLeft } from "@/utils/motion";
import { FiCode, FiAward } from "react-icons/fi";
import ProjectsCarousel from "../sub/ProjectsCarousel";
import CertificatesCarousel from "../sub/CertificatesCarousel";

type Tab = "projects" | "certificates";

const Projects = () => {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-center pt-[100px] pb-20"
      id="projects"
    >
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 max-w-2xl text-center"
      >
        <h1 className="text-[40px] md:text-[48px] font-semibold text-gray-200">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Works
          </span>
        </h1>
        <p className="mt-3 text-gray-400 text-[15px]">
          Explore my projects and achievements.
        </p>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#7042f861] bg-[#0300145e] p-1.5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setTab("projects")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-medium transition-all duration-300 ${
                tab === "projects"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_18px_rgba(112,66,248,0.4)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <FiCode size={16} />
              Projects
            </button>
            <button
              type="button"
              onClick={() => setTab("certificates")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[14px] font-medium transition-all duration-300 ${
                tab === "certificates"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_18px_rgba(112,66,248,0.4)]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <FiAward size={16} />
              Certificates
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.6)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full"
      >
        {tab === "projects" ? <ProjectsCarousel /> : <CertificatesCarousel />}
      </motion.div>
    </div>
  );
};

export default Projects;
