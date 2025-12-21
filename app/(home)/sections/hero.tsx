import Image from "next/image";
import bannerSvg from "@/src/banner-black-bow.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-[22%] sm:pt-[22%] md:pt-[18%] px-4 sm:px-0 text-center">
          <div className="flex flex-col items-center gap-0 sm:gap-2">
            <h1
              id="hero-title"
              className="font-headTH text-[24px] font-medium leading-[1.2]
                           sm:text-[32px] md:text-[40px] lg:text-[48px]
                           text-primary-blue whitespace-nowrap"
            >
              Intania Job Fair 2025
            </h1>

            <p
              className="font-bodyTH text-[16px] font-normal leading-[1.2]
                           sm:text-[20px] md:text-[24px] lg:text-[28px]
                           text-primary-blue/85 whitespace-nowrap text-center"
            >
              Engineering Your Future
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-6 mt-4 sm:mt-6">
            <div className="flex flex-col items-center gap-1">
              <p
                className="font-bodyTH text-[14px] sm:text-[18px] md:text-[20px] font-normal leading-none
                           text-primary-blue whitespace-nowrap text-center"
              >
                เตรียมเรซูเม่ให้พร้อม แล้วมาเจอกัน!
              </p>
              <p
                className="font-bodyTH text-[14px] sm:text-[18px] md:text-[20px] font-normal leading-none
                           text-primary-blue whitespace-nowrap text-center"
              >
                7-8 มกราคมนี้ เวลา 9.30-15.30 น.
              </p>
              <p
                className="font-bodyTH text-[14px] sm:text-[18px] md:text-[20px] font-normal leading-none
                           text-primary-blue whitespace-nowrap text-center"
              >
                ณ ศาลาพระเกี้ยว
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <Link href="#">
                <Button
                  className="w-[127px] h-[37px] sm:w-[150px] sm:h-[42px] md:w-[160px] md:h-[46px] rounded-[6px] gap-[10px]
                             bg-primary-yellow hover:bg-primary-yellow/90
                             shadow-[0px_4px_10px_0px_#AEAEAE1A]
                             pt-2 pr-4 pb-2 pl-4"
                >
                  <span className="font-bodyTH text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-none text-[#102E50]">
                    ลงทะเบียนเลย!
                  </span>
                </Button>
              </Link>
              <Link href="#">
                <Button
                  className="w-[108px] h-[37px] sm:w-[130px] sm:h-[42px] md:w-[140px] md:h-[46px] rounded-[6px] gap-[10px]
                             bg-secondary-yellow hover:bg-secondary-yellow/90
                             shadow-[0px_4px_10px_0px_#AEAEAE1A]
                             pt-2 pr-4 pb-2 pl-4"
                >
                  <span className="font-bodyTH text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-none text-[#102E50]">
                    แบบประเมิน
                  </span>
                </Button>
              </Link>
            </div>
            <p
              className="font-bodyTH text-[12px] font-normal leading-none
                         text-primary-blue text-center mt-2"
            >
              หมายเหตุ: ลงทะเบียนได้ตั้งแต่วันที่ 7 ม.ค. 69 เป็นต้นไป
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
