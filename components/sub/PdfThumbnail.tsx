/** @format */

"use client";

import React, { useEffect, useRef, useState } from "react";

interface PdfThumbnailProps {
  src: string;
  className?: string;
}

// pdfjs-dist touches browser-only APIs (Worker, DOM canvas), so it must
// only ever be loaded on the client — never at module scope, and never
// during SSR/build. It's imported lazily inside the effect below, and the
// worker is configured once and cached across every thumbnail on the page.
let pdfjsModulePromise: Promise<typeof import("pdfjs-dist")> | null = null;

const getPdfjs = () => {
  if (!pdfjsModulePromise) {
    pdfjsModulePromise = import("pdfjs-dist").then((pdfjsLib) => {
      // Self-hosted worker file — see the setup notes for where this file
      // comes from (copied out of node_modules/pdfjs-dist after install).
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
      return pdfjsLib;
    });
  }
  return pdfjsModulePromise;
};

const PdfThumbnail = ({ src, className }: PdfThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    let renderTask: { cancel: () => void } | null = null;

    setStatus("loading");

    getPdfjs()
      .then((pdfjsLib) => pdfjsLib.getDocument(src).promise)
      .then((pdf) => pdf.getPage(1))
      .then((page) => {
        if (cancelled || !canvasRef.current) return;

        // Render at 2x so the preview stays crisp on high-DPI screens —
        // the surrounding card controls the actual display size via CSS.
        const viewport = page.getViewport({ scale: 2 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const task = page.render({ canvasContext: context, viewport });
        renderTask = task;

        return task.promise.then(() => {
          if (!cancelled) setStatus("ready");
        });
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Gagal me-render preview PDF:", err);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [src]);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[#0300145e] ${
        className ?? ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#7042f861] border-t-cyan-300" />
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="text-[12px] text-gray-500">
            Preview tidak tersedia
          </span>
        </div>
      )}
    </div>
  );
};

export default PdfThumbnail;
