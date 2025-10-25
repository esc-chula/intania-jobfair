import Image from "next/image";
import cdcLogo from "@/src/cdc-logo.svg";
import chulaEngLogo from "@/src/logo-thai-red1.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-yellow">
      <div className="mx-auto max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1200px] h-[52px] sm:h-[60px] md:h-[68px] flex items-center justify-between px-4 sm:px-6 md:px-8 py-2">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Image
            src={cdcLogo}
            alt="CDC Logo"
            width={144}
            height={36}
            className="h-7 w-auto sm:h-8 md:h-9"
            priority
          />
        </div>

        <div>
          <Image
            src={chulaEngLogo}
            alt="Chula Engineering Logo"
            width={36}
            height={36}
            className="h-7 w-auto sm:h-8 md:h-9"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
