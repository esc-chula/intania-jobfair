import { Company } from "@/types/schema";

export const BoothDisplay = ({ company }: { company: Company | null }) => {
  if (!company) {
    return (
      <h3 className="shrink-0 font-bodyEN font-bold text-slate-500 whitespace-nowrap">
        No data
      </h3>
    );
  }
  if (company.boothDay1 && !company.boothDay2) {
    return (
      <div className="flex gap-2 flex-col items-end text-[#E78B48] font-bodyEN">
        <h3 className="font-bodyEN font-bold">{company.boothDay1}</h3>
        <p className="body-th-3 whitespace-nowrap">7 ม.ค. เท่านั้น</p>
      </div>
    );
  } else if (!company.boothDay1 && company.boothDay2) {
    return (
      <div className="flex gap-2 flex-col items-end text-[#E78B48]">
        <h3 className="font-bodyEN font-bold">{company.boothDay2}</h3>
        <p className="body-th-3 whitespace-nowrap">8 ม.ค. เท่านั้น</p>
      </div>
    );
  } else if (company.boothDay1 && company.boothDay2) {
    if (company.boothDay1 == company.boothDay2) {
      return (
        <div className="flex gap-2 flex-col items-end text-[#E78B48]">
          <h3 className="font-bodyEN font-bold">{company.boothDay2}</h3>
          <p className="body-th-3 whitespace-nowrap">7-8 ม.ค.</p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 text-[#E78B48]">
          <div className="flex gap-2 flex-col items-center">
            <h3 className="font-bodyEN font-bold">{company.boothDay1}</h3>
            <p className="body-th-3 whitespace-nowrap">7 ม.ค.</p>
          </div>
          <div className="w-px bg-[#E78B48] self-stretch" />
          <div className="flex gap-2 flex-col items-center">
            <h3 className="font-bodyEN font-bold">{company.boothDay2}</h3>
            <p className="body-th-3 whitespace-nowrap">8 ม.ค.</p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <h3 className="shrink-0 font-bodyEN font-bold text-slate-500 whitespace-nowrap">
        Online
      </h3>
    );
  }
};
