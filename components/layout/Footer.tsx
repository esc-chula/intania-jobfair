import Image from "next/image";
import cdcLogo from "@/src/cdc-logo.svg";
import chulaEngLogo from "@/src/logo-thai-red1.svg";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-yellow">
      <div className="mx-auto max-w-[320px] h-[52px] flex items-center justify-between px-6 py-2">
        
        
        <div className="flex items-center gap-2">
          <Image
            src={cdcLogo}
            alt="CDC Logo"
            width={144}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </div>

  
        <div>
          <Image
            src={chulaEngLogo}
            alt="Chula Engineering Logo"
            width={36}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
