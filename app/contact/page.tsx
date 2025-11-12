import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex justify-center items-start px-4 py-8 sm:py-10 lg:py-12">
      <div className="flex w-full max-w-3xl flex-col gap-8 sm:gap-10 lg:gap-12">
        {/* Contact Us Heading */}
        <h1 className="font-headEN font-bold text-[24px] leading-[110%] text-[#102E50] sm:text-[28px] md:text-[32px] lg:text-[36px]">
          Contact Us
        </h1>

        {/* CDC Section */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="body-th-3 font-bold text-[#102E50] text-base sm:text-lg md:text-xl">
              ศูนย์พัฒนาสมรรถนะและความพร้อมทางอาชีพ (CDC)
            </h2>
            <p className="body-th-3 font-bold text-[#102E50] text-sm sm:text-base md:text-lg">
              ภารกิจกิจการนิสิต คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 sm:items-center">
              <Phone width={18} height={18} className="shrink-0 text-[#102E50]" />
              <a
                href="tel:02-218-6349"
                className="body-th-3 text-sm text-[#102E50] hover:opacity-80 sm:text-base md:text-lg"
              >
                02-218-6349 (08.00 - 17.00 น. ในวันทำการ)
              </a>
            </div>

            <div className="flex items-start gap-3 sm:items-center">
              <Mail width={18} height={18} className="shrink-0 text-[#102E50]" />
              <a
                href="mailto:cdc@eng.chula.ac.th"
                className="body-th-3 text-sm text-[#102E50] hover:opacity-80 sm:text-base md:text-lg"
              >
                cdc@eng.chula.ac.th
              </a>
            </div>
          </div>
        </div>

        {/* Academic Affairs Section */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="body-th-3 font-bold text-[#102E50] text-base sm:text-lg md:text-xl">
              ฝ่ายวิชาการ กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 sm:items-center">
              <Instagram width={18} height={18} className="shrink-0 text-[#102E50]" />
              <a
                href="https://www.instagram.com/academic.esc"
                target="_blank"
                rel="noopener noreferrer"
                className="body-th-3 text-sm text-[#102E50] hover:opacity-80 sm:text-base md:text-lg"
              >
                academic.esc
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
