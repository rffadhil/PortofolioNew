/** @format */

"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "interactive" | "card" | "hidden";

// hidden's values are never actually shown (opacity goes to 0 for that
// state) — they just need to exist so the lookups below stay type-safe.
const PLANETS: Record<CursorState, string> = {
  default: "/Kursor1.png",
  interactive: "/Kursor3.png",
  card: "/Kursor2.png",
  hidden: "/Kursor1.png",
};

const SIZE: Record<CursorState, number> = {
  default: 30,
  interactive: 46,
  card: 62,
  hidden: 30,
};

const GLOW: Record<CursorState, string> = {
  default: "0 0 0px rgba(0,0,0,0)",
  interactive:
    "0 0 22px 4px rgba(34,211,238,0.55), 0 0 40px 8px rgba(112,66,248,0.35)",
  card: "0 0 34px 8px rgba(34,211,238,0.65), 0 0 60px 14px rgba(112,66,248,0.45)",
  hidden: "0 0 0px rgba(0,0,0,0)",
};

// Elements where the carousel's own native grab/grabbing cursor (already
// set via Tailwind classes on that element) should show instead of ours.
const GRAB_SELECTOR = '[class*="cursor-grab"]';
// Clickable elements -> bigger planet + glow.
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label';
// Plain text content -> hide ours, let the native text cursor show.
const TEXT_SELECTOR = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, td, th";
// Project/certificate cards -> stronger planet + glow. Both already use a
// semantic <article> tag, so this needs no changes to those files.
const CARD_SELECTOR = "article";

const CustomCursor = () => {
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  // Only takes over on devices that actually have a mouse/hover — never on
  // touch-only devices.
  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") {
        setState("default");
        return;
      }

      if (target.closest(GRAB_SELECTOR)) {
        setState("hidden");
      } else if (target.closest(CARD_SELECTOR)) {
        setState("card");
      } else if (target.closest(INTERACTIVE_SELECTOR)) {
        setState("interactive");
      } else if (target.closest(TEXT_SELECTOR)) {
        setState("hidden");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isHidden = state === "hidden";

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body {
            cursor: none;
          }
          p, h1, h2, h3, h4, h5, h6, span, li, label, blockquote, td, th {
            cursor: text;
          }
          a, a *, button, button *, [role="button"], [role="button"] *,
          input, textarea, select, summary,
          [class*="cursor-grab"], [class*="cursor-grab"] * {
            cursor: none;
          }
        }
      `}</style>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          animate={{
            width: SIZE[state],
            height: SIZE[state],
            boxShadow: GLOW[state],
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="rounded-full"
        >
          <div className="h-full w-full overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PLANETS[state]}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
