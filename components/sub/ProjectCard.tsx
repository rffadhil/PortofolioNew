/** @format */

"use client";

import Image from "next/image";
import React from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";

interface ProjectCardProps {
  src: string;
  title: string;
  description: string;
  link?: string;
  tags?: string[];
}

const getHostname = (url?: string) => {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const ProjectCard = ({
  src,
  title,
  description,
  link,
  tags = [],
}: ProjectCardProps) => {
  const hostname = getHostname(link);
  const isGithub = hostname.includes("github.com");
  const ctaLabel = link ? (isGithub ? "View Code" : "View Live") : null;

  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-2xl border border-[#7042f861] bg-[#0300145e] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/50 hover:shadow-[0_12px_40px_-4px_rgba(3,0,20,0.8),0_0_24px_2px_rgba(112,66,248,0.25)]">
      {/* Browser-style header */}
      <div className="flex items-center justify-between border-b border-[#7042f861] bg-[#03001480] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/70" />
        </div>
        <span className="truncate px-2 text-[11px] tracking-wider text-gray-500">
          {hostname || "preview"}
        </span>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} in a new tab`}
            className="text-gray-500 transition-colors hover:text-cyan-300"
          >
            <FiExternalLink size={14} />
          </a>
        ) : (
          <span className="w-[14px]" />
        )}
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#7042f861] bg-[#0300145e]">
        <Image
          src={src}
          alt={title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 410px"
          className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0300145e] via-transparent to-transparent opacity-50" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-[20px] font-semibold text-gray-200 transition-colors group-hover/card:text-cyan-300">
            {title}
          </h3>
          <p className="line-clamp-3 text-[15px] text-gray-400">
            {description}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[#7042f861] bg-[#2c2640]/60 px-2.5 py-1 text-[11px] text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {ctaLabel && link && (
            <div className="flex items-center justify-end border-t border-[#7042f861] pt-3 text-[14px]">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium text-cyan-300 transition-transform hover:underline group-hover/card:translate-x-1"
              >
                {ctaLabel}
                <FiArrowUpRight size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
