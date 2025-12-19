
import Section from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Download, CircleAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mapImage from "@/src/map.svg";

export default function BoothMap() {
    return (
        <div className="flex flex-col gap-6">
            <div className="w-full rounded-lg border border-border bg-[#FFE2E2] px-4 py-3 text-[#DC2626]">
                <div className="flex items-start gap-3">
                    <CircleAlert className="h-5 w-5 shrink-0 translate-y-[2px]" />
                    <p className="font-bodyTH text-[14px] leading-none">
                        ข้อมูลบนเว็บไซต์เป็นข้อมูลเบื้องต้น โปรดสอบถามรายละเอียดเพิ่มเติมที่บูธในงาน
                    </p>
                </div>
            </div>

            <Section
                title="แผนผังบูธบริษัท"
                actionLabel="ดูบูธทั้งหมด"
                actionHref="/booths"
            >
                <div className="flex flex-col items-center gap-4">
                    {/* Map Image */}
                    <div className="w-full relative aspect-[358/528] sm:aspect-[4/3] md:aspect-[16/9]  overflow-hidden border border-gray-200">
                        <Image
                            src={mapImage}
                            alt="Booth Map"
                            fill
                            className="object-contain bg-white"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    {/* Download Button */}
                    <Link href="#">
                        <Button
                            className="w-[174px] h-[37px] rounded-[6px] gap-[10px]
                         bg-primary-yellow hover:bg-primary-yellow/90
                         shadow-[0px_4px_10px_0px_#AEAEAE1A]
                         pt-2 pr-4 pb-2 pl-4"
                        >
                            <Download className="w-4 h-4 text-primary-blue" />
                            <span className="font-bodyTH text-[16px] font-normal leading-none text-primary-blue">
                                ดาวน์โหลดแผนผัง
                            </span>
                        </Button>
                    </Link>
                </div>
            </Section>
        </div>
    );
}
