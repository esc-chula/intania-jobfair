"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import cdcLogo from "@/src/cdc-logo.svg";
import chulaEngLogo from "@/src/logo-thai-red1.svg";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="w-full bg-primary-yellow">
      <div className={`mx-auto h-[52px] flex items-center justify-between px-4 py-2 ${
        isClient 
          ? "max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] sm:h-[60px] md:h-[68px] sm:px-6 md:px-8" 
          : "max-w-[320px]"
      }`}>
        <div className={`flex items-center ${
          isClient 
            ? "gap-2 sm:gap-3 md:gap-4" 
            : "gap-2"
        }`}>
          <Image
            src={cdcLogo}
            alt="CDC Logo"
            width={144}
            height={36}
            className={`w-auto ${
              isClient 
                ? "h-7 sm:h-8 md:h-9" 
                : "h-7"
            }`}
            priority
          />
        </div>

        <div>
          <Image
            src={chulaEngLogo}
            alt="Chula Engineering Logo"
            width={36}
            height={36}
            className={`w-auto ${
              isClient 
                ? "h-7 sm:h-8 md:h-9" 
                : "h-7"
            }`}
            priority
          />
        </div>
      </div>
    </footer>
  );
}
