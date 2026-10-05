/** @format */

import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      {/* Mobile-only background video: fixed height (not h-full, which on
          mobile would stretch across the much taller stacked flex-col
          layout) + a bottom fade so it can't wash out the heading below it
          even if the exact offset isn't pixel-perfect. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute top-[-100px] left-0 z-[1] block h-[320px] w-full object-cover md:hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      {/* Desktop video — unchanged from the original, untouched. */}
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] hidden h-full w-full left-0 z-[1] object-cover md:block"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};

export default Hero;
