/** @format */

"use client";

import Image from "next/image";
import React from "react";

interface Props {
  src: string;
  title: string;
  description: string;
  link?: string;
}

const ProjectCard = ({ src, title, description, link }: Props) => {
  return (
    <div className="relative z-[999] overflow-hidden rounded-lg shadow-lg border border-[#2A0E61]">
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          <Image
            src={src}
            alt={title}
            width={1000}
            height={1000}
            className="w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
          />
        </a>
      ) : (
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full object-contain"
        />
      )}

      <div className="relative p-4">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>

        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
