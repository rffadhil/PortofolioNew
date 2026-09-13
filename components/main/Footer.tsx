/** @format */

import React from "react";
import { RxGithubLogo, RxInstagramLogo, RxLinkedinLogo } from "react-icons/rx";

const Footer = () => {
  return (
    <div className="relative z-20 w-full h-full bg-transparent text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center m-auto">
        <div className="w-full h-full flex flex-row items-start justify-around flex-wrap gap-10">
          {/* Navigation */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Navigation</div>

            <a
              href="#about-me"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <span className="text-[15px]">About Me</span>
            </a>

            <a
              href="#skills"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <span className="text-[15px]">Skills</span>
            </a>

            <a
              href="#projects"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <span className="text-[15px]">Projects</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">Social Media</div>

            <a
              href="https://www.instagram.com/rffadhil_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <RxInstagramLogo />
              <span className="text-[15px] ml-[6px]">Instagram</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rafi-fadhil-amanullah-0b1412326/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <RxLinkedinLogo />
              <span className="text-[15px] ml-[6px]">LinkedIn</span>
            </a>

            <a
              href="https://github.com/rffadhil"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center my-[15px] cursor-pointer hover:text-purple-400 transition"
            >
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">GitHub</span>
            </a>
          </div>

          {/* About */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px]">About</div>

            <p className="flex flex-row items-center my-[15px]">
              <span className="text-[15px]">Informatics Engineering</span>
            </p>

            <p className="flex flex-row items-center my-[15px]">
              <span className="text-[15px]">Universitas Pamulang</span>
            </p>

            <p className="flex flex-row items-center my-[15px]">
              <span className="text-[15px]">rafifadh8@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="mb-[20px] mt-[20px] text-[15px] text-center text-gray-400">
          &copy; 2026 Rafi Fadhil Amanullah. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
