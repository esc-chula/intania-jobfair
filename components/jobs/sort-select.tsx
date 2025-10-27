import * as Select from "@/components/ui/select";

export default function SortSelector({
  sortOption,
  setSortOption,
}: {
  sortOption: "position" | "open-date" | "close-date";
  setSortOption: (v: "position" | "open-date" | "close-date") => void;
}) {
  return (
    <div className="flex justify-end items-center gap-2 mb-4">
      <p className="text-primary-blue font-bodyTH">เรียงตาม</p>
      <Select.Select
        value={sortOption}
        onValueChange={(v) =>
          setSortOption(v as "position" | "open-date" | "close-date")
        }
      >
        <Select.SelectTrigger className="bg-white font-bodyTH">
          <Select.SelectValue placeholder="ชื่อตำแหน่งงาน" />
        </Select.SelectTrigger>
        <Select.SelectContent>
          <Select.SelectItem value="position">
            <p className="font-bodyTH">ชื่อตำแหน่งงาน</p>
          </Select.SelectItem>
          <Select.SelectItem value="open-date">
            <p className="font-bodyTH">วันเปิดรับสมัคร</p>
          </Select.SelectItem>
          <Select.SelectItem value="close-date">
            <p className="font-bodyTH">วันปิดรับสมัคร</p>
          </Select.SelectItem>
        </Select.SelectContent>
      </Select.Select>
    </div>
  );
}
