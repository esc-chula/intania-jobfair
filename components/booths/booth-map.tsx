import Section from "@/components/common/section";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, CircleAlert } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import mapImage from "@/src/map.jpg";

export default function BoothMap() {
  return (
    <div className="flex flex-col gap-6">
      <Section
        title="แผนผังบูธบริษัท"
        actionHref="/booths"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Map Image */}
          <div className="w-full relative aspect-[358/528] overflow-hidden">
            <Image
              src={mapImage}
              alt="Booth Map"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
