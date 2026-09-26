/** @format */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StarsCanvas from "./StarBackground";

type Phase = "loading" | "exiting" | "done";

// Every exit-phase animation below shares this duration, on purpose — a
// mismatch here (one element still mid-transition when the preloader gets
// unmounted) is what caused the black hole video to look like it got cut
// off abruptly.
const EXIT_DURATION = 0.9;

const statusForProgress = (progress: number) => {
  if (progress >= 100) return "PORTAL READY";
  if (progress >= 90) return "WARPING REALM";
  if (progress > 60) return "SYNCING PORTAL";
  return "INITIALIZING";
};

interface PreloaderProps {
  children: React.ReactNode;
}

// Fullscreen opening preloader. Mounted once in app/layout.tsx wrapping the
// page's main content, so it runs on every full page load/reload.
//
// `children` (Hero/Skills/Journey/Projects/Contact) only mount once the
// preloader is fully done, so their own whileInView entrance animations
// (and any images inside them) don't fire early while hidden behind it.
const Preloader = ({ children }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Simulated cinematic progress — decorative, not tied to real asset
  // loading (matches the finalized Stitch design).
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) =>
        prev >= 100
          ? 100
          : Math.min(prev + Math.floor(Math.random() * 4) + 2, 100),
      );
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  // Hitting 100% starts the exit sequence.
  useEffect(() => {
    if (progress < 100 || phase !== "loading") return;
    const timer = setTimeout(() => setPhase("exiting"), 350);
    return () => clearTimeout(timer);
  }, [progress, phase]);

  // Unmount only once every exit animation has actually finished (duration
  // + a small buffer), so nothing gets cut off mid-transition.
  useEffect(() => {
    if (phase !== "exiting") return;
    const timer = setTimeout(
      () => setPhase("done"),
      EXIT_DURATION * 1000 + 100,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  // Block scrolling while the preloader is up — via event prevention, not
  // by toggling the body's `overflow` CSS. The body already always renders
  // its scrollbar track (`overflow-y-scroll`), so leaving that alone means
  // the scrollbar never flickers on/off when the preloader finishes.
  useEffect(() => {
    if (phase === "done") return;

    const preventScroll = (e: Event) => e.preventDefault();
    const preventKeyScroll = (e: KeyboardEvent) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeyScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeyScroll);
    };
  }, [phase]);

  // Defensive autoplay: some browsers want `muted` set as a JS property
  // (not just the attribute) before play() is allowed.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked — the dark fallback background still looks fine.
    });
  }, []);

  const isExiting = phase === "exiting";
  const isDone = phase === "done";

  return (
    <>
      {isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}

      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030014]"
          initial={{ opacity: 1 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Reuse the existing starfield component — no new star system */}
          <StarsCanvas />

          {/* Ambient cosmic glow behind the orb */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(112,66,248,0.22) 0%, rgba(34,211,238,0.12) 35%, rgba(3,0,20,0) 70%)",
            }}
          />

          <motion.div
            className="relative z-10 flex max-w-xl select-none flex-col items-center px-6 text-center"
            animate={
              isExiting
                ? { opacity: 0, scale: 1.08, filter: "blur(16px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: EXIT_DURATION, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Orbital rings + black hole core */}
            <div className="relative mb-10 flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              </motion.div>

              <motion.div
                className="absolute inset-4 rounded-full border border-dashed border-purple-400/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute bottom-1 right-8 h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_rgba(204,190,255,0.9)]" />
              </motion.div>

              <motion.div
                className="absolute inset-8 rounded-full border border-cyan-200/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="relative z-20 h-20 w-20 overflow-hidden rounded-full bg-[#100a23] shadow-[0_0_30px_rgba(112,66,248,0.45)] sm:h-24 sm:w-24"
                animate={
                  isExiting
                    ? { scale: 24, opacity: 0 }
                    : { scale: [1, 1.06, 1] }
                }
                transition={
                  isExiting
                    ? { duration: EXIT_DURATION, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <video
                  ref={videoRef}
                  src="/blackhole.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="mb-12 flex flex-col items-center gap-2">
              <p className="text-[13px] font-light uppercase tracking-[0.22em] text-gray-300 opacity-90 sm:text-[15px]">
                Welcome to My
              </p>
              <h1 className="bg-gradient-to-br from-white via-cyan-100 to-purple-400 bg-clip-text text-[28px] font-extrabold tracking-tight text-transparent drop-shadow-[0_0_24px_rgba(112,66,248,0.35)] sm:text-[40px]">
                Portfolio Website
              </h1>
              <p className="pt-1 text-[11px] font-normal uppercase tracking-[0.28em] text-gray-400 opacity-75 sm:text-[13px]">
                Rafi Fadhil Amanullah
              </p>
            </div>

            {/* Progress */}
            <div className="flex w-full max-w-xs flex-col gap-2.5 sm:max-w-sm">
              <div className="flex items-center justify-between text-[11px] tracking-[0.16em] text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-300" />
                  {statusForProgress(progress)}
                </span>
                <span className="font-semibold text-cyan-200">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#2c2640]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #7042f8 0%, #22d3ee 100%)",
                    boxShadow: "0 0 14px rgba(34,211,238,0.6)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Preloader;
