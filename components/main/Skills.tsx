/** @format */

import { Portfolio_skills } from "@/constants";
import React from "react";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-6 h-full relative overflow-hidden pb-80 py-20"
      style={{ transform: "scale(0.9)" }}
    >
      <SkillText />

      {/* Row 1 */}
      <div className="flex justify-center items-center gap-6 mt-8">
        {Portfolio_skills.slice(0, 7).map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex justify-center items-center gap-6 mt-4">
        {Portfolio_skills.slice(7, 12).map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index + 7}
          />
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex justify-center items-center gap-6 mt-4">
        {Portfolio_skills.slice(12, 16).map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index + 12}
          />
        ))}
      </div>

      {/* Badge */}
      <div className="Welcome-box mt-12 py-[8px] px-[12px] border border-[#7042f88b] opacity-90 flex items-center">
        <SparklesIcon className="text-[#b49bff] mr-2 h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">Built with Passion</h1>
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
