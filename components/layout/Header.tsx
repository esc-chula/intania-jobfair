"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/src/logo-jobfair.svg";
import ExpandedNav from "../ExpandedNav";

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
      <div className="mx-auto max-w-[320px] h-[56px] flex items-center justify-between px-6 py-2">
        <div className="flex items-center justify-between w-full gap-[113px]">
          <Link href="/" className="inline-flex items-center">
            <Image
              src={logo}
              alt="Intania Job Fair 2025"
              width={85}
              height={40}
              priority
            />
          </Link>

          {/* ปุ่มเมนู 24x24 */}
          <button
            ref={btnRef}
            type="button"
            aria-label="เมนู"
            aria-expanded={open}
            aria-controls="expanded-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center w-6 h-6 text-primary-blue"
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
