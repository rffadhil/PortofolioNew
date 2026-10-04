/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { id: "about-me", href: "#about-me", label: "About me" },
  { id: "experience", href: "#experience", label: "Journey" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "skills", href: "#skills", label: "Skills" },
];

const Navbar = () => {
  const [active, setActive] = useState<string>("about-me");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let pollId: ReturnType<typeof setInterval> | null = null;

    const observedIds = [...NAV_LINKS.map((link) => link.id), "contact"];

    const trySetup = () => {
      const sections = observedIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // The real sections only mount once Preloader finishes (see
      // components/main/Preloader.tsx) — Navbar mounts before that, so on
      // first run these won't exist yet. Keep polling lightly until they
      // do, then set the observer up for real.
      if (sections.length !== observedIds.length) return false;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        {
          // A thin horizontal band just below the fixed navbar — whichever
          // section is crossing it becomes the active one.
          rootMargin: "-100px 0px -70% 0px",
          threshold: 0,
        },
      );

      sections.forEach((section) => observer!.observe(section));
      return true;
    };

    if (!trySetup()) {
      pollId = setInterval(() => {
        if (trySetup() && pollId) {
          clearInterval(pollId);
        }
      }, 200);
    }

    return () => {
      observer?.disconnect();
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#030014]/60 backdrop-blur-md z-[999] px-4 md:px-10">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        <a
          href="#about-me"
          className="h-auto w-auto flex flex-row items-center"
        >
          {/* <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer hover:animate-slowspin"
          /> */}

          <span className="font-bold ml-[10px] hidden md:block text-gray-300">
            RafiFadh Dev
          </span>
        </a>

        {/* Desktop pill nav — unchanged, just hidden below md now */}
        <div className="hidden md:flex w-[550px] h-full flex-row items-center justify-between md:mr-20">
          <div className="flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="relative cursor-pointer px-2.5 py-1"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-cyan-400/50 bg-gradient-to-r from-purple-500/15 to-cyan-400/15 shadow-[0_0_14px_rgba(34,211,238,0.35),0_0_10px_rgba(112,66,248,0.3)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? "text-cyan-200" : "text-gray-200"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row items-center gap-3">
          {/* Mobile-only hamburger toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-[#7042f861] bg-[#0300145e] text-gray-200"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          <a
            href="#contact"
            className={`px-6 py-2 rounded-full border backdrop-blur-md text-sm font-medium transition-all duration-300 ${
              active === "contact"
                ? "border-cyan-400/70 bg-[#0300145e] text-cyan-300 shadow-[0_0_22px_rgba(34,211,238,0.45)]"
                : "border-[#7042f861] bg-[#0300145e] text-gray-200 shadow-[0_0_12px_rgba(112,66,248,0.15)] hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            }`}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 top-[65px] flex w-full flex-col gap-1 border-t border-[#7042f861] bg-[#0300145e] px-4 py-4 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-[15px] transition-colors duration-300 ${
                    isActive ? "bg-[#7042f81a] text-cyan-200" : "text-gray-200"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
