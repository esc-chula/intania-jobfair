"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/logo-jobfair.svg";
import ExpandedNav from "./ExpandedNav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // ปิดด้วย ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`w-full bg-primary-yellow ${
      open ? "fixed top-0 z-50" : "relative"
    }`}>
      <div className="mx-auto max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] h-[56px] sm:h-[64px] md:h-[72px] flex items-center justify-between px-4 sm:px-6 md:px-8 py-2">
        <div className="flex items-center justify-between w-full gap-4 sm:gap-8 md:gap-12">
          <Link href="/" className="inline-flex items-center">
            <Image
              src={logo}
              alt="Intania Job Fair 2025"
              width={85}
              height={40}
              className="w-auto h-8 sm:h-10 md:h-12"
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
            className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-blue hover:opacity-80 transition-opacity"
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
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
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
  );
}
