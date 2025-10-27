import Image from "next/image";
import bannerSvg from "@/src/banner.svg";

export default function Hero() {
  return (
    <section className="w-full -mt-[1px]">
      {/* Banner (responsive, full image visible) */}
      <div aria-labelledby="hero-title" className="relative w-full">
        {/* Background banner image (intrinsic sizing for full visibility) */}
        <Image
          src={bannerSvg}
          alt="Intania Job Fair 2025 Banner"
          className="w-full h-auto object-contain"
          sizes="100vw"
          priority
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 sm:gap-4 px-4 sm:px-0 text-center">
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
