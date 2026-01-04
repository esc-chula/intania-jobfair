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
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mapDay1Image from "@/src/map.jpg";
import mapDay2Image from "@/src/map_day2.jpg";
import { motion, AnimatePresence } from "framer-motion";

const mapImages = [
  { src: mapDay1Image, alt: "Booth Map Day 1", label: "Day 1" },
  { src: mapDay2Image, alt: "Booth Map Day 2", label: "Day 2" },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function BoothMap() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = Math.abs(page % mapImages.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex flex-col gap-6">
      <Section title="แผนผังบูธบริษัท" actionHref="/booths">
        <div className="flex flex-col items-center gap-4">
          {/* Map Image Carousel */}
          <div className="w-full relative">
            <div className="relative aspect-[358/528] overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={mapImages[imageIndex].src}
                    alt={mapImages[imageIndex].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => paginate(-1)}
              className="z-10 absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5C45E80]/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-primary-blue" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="z-10 absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#F5C45E80]/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
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
                  href="https://drive.google.com/file/d/1GZSiC_0YDojoesSIU5JwUP2wLT332wJT/view?usp=sharing"
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
