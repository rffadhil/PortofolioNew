/** @format */

"use client";

import React, { useEffect, useState } from "react";
import CertificateCard from "./CertificateCard";
import { Certificates_data } from "@/constants";

const getSpacing = (width: number) => {
  if (width < 640) return { near: 130, far: 220 };
  if (width < 1024) return { near: 170, far: 280 };
  return { near: 220, far: 360 };
};

/**
 * Menentukan posisi relatif card terhadap card yang sedang aktif.
 *
 * Maksimal 5 card yang ditampilkan:
 * -2 = paling belakang kiri
 * -1 = belakang kiri
 *  0 = tengah / aktif
 * +1 = belakang kanan
 * +2 = paling belakang kanan
 *
 * Jumlah sertifikat tidak harus 5.
 */
const getOffset = (index: number, active: number, total: number) => {
  if (total <= 1) return 0;

  let offset = index - active;

  // Cari jarak terdekat secara circular
  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
};

const getCardTransform = (offset: number, near: number, far: number) => {
  switch (offset) {
    // CARD TENGAH
    case 0:
      return {
        x: 0,
        y: 0,
        z: 90,
        scale: 1.05,
        rotateY: 0,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
      };

    // CARD KIRI DEKAT
    case -1:
      return {
        x: -near,
        y: 14,
        z: 30,
        scale: 0.9,
        rotateY: 8,
        opacity: 0.72,
        filter: "blur(1px)",
        zIndex: 20,
      };

    // CARD KANAN DEKAT
    case 1:
      return {
        x: near,
        y: 14,
        z: 30,
        scale: 0.9,
        rotateY: -8,
        opacity: 0.72,
        filter: "blur(1px)",
        zIndex: 20,
      };

    // CARD PALING BELAKANG KIRI
    case -2:
      return {
        x: -far,
        y: 26,
        z: -30,
        scale: 0.76,
        rotateY: 14,
        opacity: 0.35,
        filter: "blur(3px)",
        zIndex: 10,
      };

    // CARD PALING BELAKANG KANAN
    case 2:
      return {
        x: far,
        y: 26,
        z: -30,
        scale: 0.76,
        rotateY: -14,
        opacity: 0.35,
        filter: "blur(3px)",
        zIndex: 10,
      };

    default:
      return {
        x: 0,
        y: 40,
        z: -50,
        scale: 0.65,
        rotateY: 0,
        opacity: 0,
        filter: "blur(6px)",
        zIndex: 0,
      };
  }
};

const CertificatesCarousel = () => {
  const [active, setActive] = useState(0);

  const [spacing, setSpacing] = useState(() =>
    getSpacing(typeof window !== "undefined" ? window.innerWidth : 1280),
  );

  const total = Certificates_data.length;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSpacing(getSpacing(window.innerWidth));
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  // Kalau data sertifikat kosong
  if (total === 0) {
    return null;
  }

  // Kalau jumlah data berkurang dan active index
  // sudah tidak valid
  const safeActive = Math.min(active, total - 1);

  return (
    <div className="mx-auto w-full max-w-5xl py-8">
      <div
        className="relative flex h-[420px] w-full items-center justify-center sm:h-[460px]"
        style={{ perspective: 1200 }}
      >
        {Certificates_data.map((cert, index) => {
          const offset = getOffset(index, safeActive, total);

          // Hanya tampilkan maksimal 5 card
          // (-2 sampai +2)
          if (offset < -2 || offset > 2) {
            return null;
          }

          return (
            <CertificateCard
              key={`${cert.title}-${index}`}
              title={cert.title}
              organization={cert.organization}
              year={cert.year}
              image={cert.image}
              animateProps={getCardTransform(offset, spacing.near, spacing.far)}
              onClick={() => setActive(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CertificatesCarousel;
