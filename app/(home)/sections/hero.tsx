import Image from "next/image";
import bannerSvg from "@/src/banner.svg";

export default function Hero() {
  return (
    <section className="w-full -mt-[1px]">
      {/* Fullscreen Banner */}
      <div
        aria-labelledby="hero-title"
        className="w-full h-[240px] 
                   flex flex-col items-center justify-center gap-2 text-center
                   opacity-100 relative overflow-hidden
                   pt-[90px] pr-[99px] pb-[90px] pl-[99px]
                   sm:h-[60vh] sm:min-h-[300px] sm:max-h-[600px] sm:gap-4 sm:pt-4 sm:pr-4 sm:pb-4 sm:pl-4"
      >
        {/* Background banner image */}
        <Image
          src={bannerSvg}
          alt="Intania Job Fair 2025 Banner"
          fill
          className="object-cover inset-0 z-0"
          priority
        />
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-4 px-0">
          <h1
            id="hero-title"
            className="font-headTH text-[24px] font-medium leading-[1.2]
                       sm:text-[32px] md:text-[40px] lg:text-[48px]
                       text-[#102E50] whitespace-nowrap"
          >
            Intania Job Fair 2025
          </h1>

          <p
            className="font-bodyTH text-[16px] font-normal leading-[1.2]
                       sm:text-[20px] md:text-[24px] lg:text-[28px]
                       text-[#102E50]/85 whitespace-nowrap text-center"
          >
            Engineering Your Future
          </p>
        </div>
      </div>
    </section>
  );
}
