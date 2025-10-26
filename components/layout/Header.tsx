"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/logo-jobfair.svg";
import ExpandedNav from "./ExpandedNav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // ตรวจสอบ client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ปิดด้วย ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`w-full bg-primary-yellow fixed top-0 left-0 right-0 z-50`}>
        <div className={`mx-auto h-[56px] flex items-center justify-between px-4 py-2 ${
        isClient 
          ? "max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] sm:h-[64px] md:h-[72px] sm:px-6 md:px-8" 
          : "max-w-[320px]"
      }`}>
        <div className={`flex items-center justify-between w-full ${
          isClient 
            ? "gap-4 sm:gap-8 md:gap-12" 
            : "gap-[113px]"
        }`}>
          <Link href="/" className="inline-flex items-center">
            <Image
              src={logo}
              alt="Intania Job Fair 2025"
              width={85}
              height={40}
              className={`w-auto ${
                isClient 
                  ? "h-8 sm:h-10 md:h-12" 
                  : "h-8"
              }`}
              priority
            />
          </Link>

          {/* ปุ่มเมนู responsive */}
          <button
            ref={btnRef}
            type="button"
            aria-label="เมนู"
            aria-expanded={open}
            aria-controls="expanded-nav"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex items-center justify-center text-primary-blue ${
              isClient 
                ? "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 hover:opacity-80 transition-opacity" 
                : "w-6 h-6"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              shapeRendering="geometricPrecision"
              vectorEffect="non-scaling-stroke"
              className={`${
                isClient 
                  ? "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" 
                  : "w-5 h-5"
              }`}
            >
              <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* แผง Expanded Nav */}
      <ExpandedNav
        id="expanded-nav"
        open={open}
        onClose={() => setOpen(false)}
        anchorRef={btnRef}
      />
      </header>
      {/* Spacer เพื่อไม่ให้เนื้อหาอยู่ใต้ fixed header */}
      <div className={`h-[56px] ${isClient ? "sm:h-[64px] md:h-[72px]" : ""}`} />
    </>
  );
}
