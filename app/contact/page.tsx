import { Phone, Mail, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex justify-center items-start">
      <div className="flex flex-col w-[320px] p-4 gap-4">
      {/* Contact Us Heading */}
      <h1 className="font-headEN font-bold text-[20px] leading-[100%] text-black">
        Contact Us
      </h1>

      {/* CDC Section */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="body-th-3 font-bold text-[#102E50]">
            ศูนย์พัฒนาสมรรถนะและความพร้อมทางอาชีพ (CDC)
          </h2>
          <p className="body-th-3 font-bold text-[#102E50]">
            ภารกิจกิจการนิสิต คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Phone width={16} height={16} className="text-[#102E50] shrink-0" />
            <a href="tel:02-218-6349" className="body-th-3 text-[#102E50] hover:opacity-80">
              02-218-6349 (08.00 - 17.00 น. ในวันทำการ)
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail width={16} height={16} className="text-[#102E50] shrink-0" />
            <a href="mailto:cdc@eng.chula.ac.th" className="body-th-3 text-[#102E50] hover:opacity-80">
              cdc@eng.chula.ac.th
            </a>
          </div>
        </div>
      </div>

      {/* Academic Affairs Section */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="body-th-3 font-bold text-[#102E50]">
            ฝ่ายวิชาการ กรรมการนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </h2>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Instagram width={16} height={16} className="text-[#102E50] shrink-0" />
            <a href="https://www.instagram.com/academic.esc" target="_blank" rel="noopener noreferrer" className="body-th-3 text-[#102E50] hover:opacity-80">
              academic.esc
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
