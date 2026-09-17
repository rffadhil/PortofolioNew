/** @format */

"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

interface CardTransform {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotateY: number;
  opacity: number;
  filter: string;
  zIndex: number;
}

interface CertificateCardProps {
  title: string;
  organization: string;
  year: string;
  image: string;
  animateProps: CardTransform;
  onClick: () => void;
}

const CertificateCard = ({
  title,
  organization,
  year,
  image,
  animateProps,
  onClick,
}: CertificateCardProps) => {
  const { zIndex, ...transform } = animateProps;

  return (
    <motion.article
      onClick={onClick}
      animate={transform}
      initial={false}
      transition={{
        duration: 0.5,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      style={{ zIndex }}
      className="absolute w-[280px] cursor-pointer select-none rounded-2xl bg-[#100a23]/85 p-5 shadow-[0_12px_30px_rgba(3,0,20,0.8),0_0_16px_rgba(112,66,248,0.2)] backdrop-blur-xl sm:w-[340px] sm:p-6 md:w-[380px]"
    >
      <div className="mb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-cyan-300">
            {organization}
          </span>

          <FiAward className="text-cyan-400" size={16} />
        </div>

        <h3 className="text-[18px] font-semibold tracking-tight text-gray-200">
          {title}
        </h3>
      </div>

      <div className="relative my-1 aspect-[4/3] overflow-hidden rounded-xl border border-[#7042f861] bg-[#0300145e]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="380px"
          className="object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100a23]/60 via-transparent to-transparent" />
      </div>

      <div className="flex items-center justify-between border-t border-[#7042f861] pt-3 text-[13px]">
        <span className="text-gray-400">
          {organization} · {year}
        </span>
      </div>
    </motion.article>
  );
};

export default CertificateCard;
