import Image from "next/image";
import bannerSvg from "@/src/banner.svg";

export default function Hero() {
  return (
    <section className="w-full flex justify-center ">
      {/* Banner with specified dimensions and styling */}
      <div
        aria-labelledby="hero-title"
        className="w-[320px] h-[240px] min-w-[320px]
                   pt-[90px] pr-[99px] pb-[90px] pl-[99px]
                   flex flex-col items-center gap-2 text-center
                   opacity-100 relative overflow-hidden"
      >
        {/* Background banner image */}
        <Image
          src={bannerSvg}
          alt="Intania Job Fair 2025 Banner"
          fill
          className="object-cover  inset-0 z-0"
          priority
        />
        
        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <h1
            id="hero-title"
            className="font-headTH text-[24px] font-medium leading-[1]
                       text-[#102E50] whitespace-nowrap"
          >
            Intania Job Fair 2025
          </h1>

          <p
            className="font-bodyTH text-[16px] font-normal leading-[1]
                       text-[#102E50]/85 whitespace-nowrap text-center"
          >
            Engineering Your Future
          </p>
        </div>
      </div>
    </section>
  );
}
