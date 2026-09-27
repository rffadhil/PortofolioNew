/** @format */

import React from "react";
import { Portfolio_skills } from "@/constants";

// Pure CSS marquee — no JS/hooks needed, so this stays a plain server
// component like the rest of Skills.tsx. The track is duplicated once so
// the loop can seamlessly wrap at -50% with no visible seam/reset.
const SkillsMarquee = () => {
  const names = Portfolio_skills.map((skill) => skill.skill_name);
  const track = [...names, ...names];

  return (
    <div className="relative mt-10 w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030014] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030014] to-transparent" />

      <div className="skills-marquee-track flex w-max items-center gap-3 border-y border-[#7042f861] py-2.5">
        {track.map((name, i) => (
          <React.Fragment key={`${name}-${i}`}>
            <span className="whitespace-nowrap text-[12px] font-medium tracking-wide text-gray-200">
              {name}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-[#7042f8]" />
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .skills-marquee-track {
          animation: skills-marquee-scroll 30s linear infinite;
        }
        @keyframes skills-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsMarquee;
