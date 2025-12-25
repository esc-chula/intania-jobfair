"use client";

import { useState } from "react";
import Section from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Download, ChevronLeft, ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mapDay1Image from "@/src/map.jpg";
import mapDay2Image from "@/src/map_day2.jpg";

const mapImages = [
    { src: mapDay1Image, alt: "Booth Map Day 1", label: "Day 1" },
    { src: mapDay2Image, alt: "Booth Map Day 2", label: "Day 2" },
];

export default function BoothMap() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? mapImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prev) =>
            prev === mapImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="w-full rounded-lg border border-border bg-[#FFE2E2] px-4 py-3 text-[#DC2626]">
                <div className="flex items-start gap-3">
                    <CircleAlert className="h-5 w-5 shrink-0 translate-y-[2px]" />
                    <p className="font-bodyTH text-[14px] leading-none">
                        ข้อมูลบนเว็บไซต์เป็นข้อมูลเบื้องต้น
                        โปรดสอบถามรายละเอียดเพิ่มเติมที่บูธในงาน
                    </p>
                </div>
            </div>
            <Section title="แผนผังบูธบริษัท" actionLabel="ดูบูธทั้งหมด" actionHref="/booths">
                <div className="flex flex-col items-center gap-4">
                    {/* Map Image Carousel */}
                    <div className="w-full relative">
                        <div className="relative aspect-[358/528] overflow-hidden">
                            <Image
                                src={mapImages[currentIndex].src}
                                alt={mapImages[currentIndex].alt}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6 text-primary-blue" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6 text-primary-blue" />
                        </button>
                    </div>

                    {/* Download Button */}
                    <Dialog>
                        <DialogTrigger asChild>
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
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-headTH text-xl text-primary-blue text-center">
                                    เลือกวันที่ต้องการดาวน์โหลด
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                <Link
                                    href="https://drive.google.com/file/d/1h3nnLlz9fRQ9i3ALW2me2fJ9Dds3tT8T/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-4 h-12"
                                    >
                                        <Download className="w-5 h-5 text-primary-blue" />
                                        <span className="font-bodyTH text-[16px] text-primary-blue">
                                            แผนผัง Day 1 (7 ม.ค.)
                                        </span>
                                    </Button>
                                </Link>
                                <Link
                                    href="https://drive.google.com/file/d/175jZV02BvHK8-Jo0TJaIX4wC3i8odifo/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-4 h-12"
                                    >
                                        <Download className="w-5 h-5 text-primary-blue" />
                                        <span className="font-bodyTH text-[16px] text-primary-blue">
                                            แผนผัง Day 2 (8 ม.ค.)
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </Section>
        </div>
    );
}
