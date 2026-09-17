/** @format */

"use client";

import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import { Projects_data } from "@/constants";

const SCROLL_AMOUNT = 420;

// Cross-browser fade mask for the left/right edges of the scroll area.
const edgeMaskStyle: React.CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
};

const ProjectsCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  const scrollByAmount = (amount: number) => {
    scrollerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    el.scrollLeft = scrollStartLeft.current - delta;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative">
      {/* Extra blurred overlay on top of the mask, matching the reference depth */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#030014] via-[#030014]/70 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#030014] via-[#030014]/70 to-transparent sm:w-20" />

      <div
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
        style={edgeMaskStyle}
        className="scrollbar-hidden flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 py-6 active:cursor-grabbing sm:px-14"
      >
        {Projects_data.map((project) => (
          <div
            key={project.title}
            className="w-[300px] flex-none snap-center sm:w-[380px] md:w-[410px]"
          >
            <ProjectCard
              src={project.src}
              title={project.title}
              description={project.description}
              link={project.link}
              tags={project.tags}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => scrollByAmount(-SCROLL_AMOUNT)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7042f861] bg-[#0300145e] text-gray-400 backdrop-blur-md transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => scrollByAmount(SCROLL_AMOUNT)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7042f861] bg-[#0300145e] text-gray-400 backdrop-blur-md transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
