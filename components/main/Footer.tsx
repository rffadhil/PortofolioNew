/** @format */

import React from "react";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative z-20 w-full bg-[#0300145e] backdrop-blur-md border-t border-[#7042f861]">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-10 py-8">
        <div className="flex flex-wrap items-center justify-center gap-3 text-center sm:text-left">
          <span className="font-bold text-gray-200">RafiFadh Dev</span>
          <span className="text-gray-600">•</span>
          <span className="text-[13px] text-gray-400">
            &copy; 2026 Rafi Fadhil Amanullah. All rights reserved.
          </span>
        </div>

        <a
          href="#about-me"
          className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-cyan-300 transition-colors"
        >
          <span>Back to top</span>
          <FiArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
