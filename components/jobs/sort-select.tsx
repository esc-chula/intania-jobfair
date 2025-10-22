import * as Select from "@/components/ui/select";

export default function SortSelector({
  sortOption,
  setSortOption,
}: {
  sortOption: "position" | "open-date" | "close-date";
  setSortOption: (v: "position" | "open-date" | "close-date") => void;
}) {
  return (
    <div className="flex justify-end items-center gap-2">
      <p>เรียงตาม</p>
      <Select.Select
        value={sortOption}
        onValueChange={(v) =>
          setSortOption(v as "position" | "open-date" | "close-date")
        }
      >
        <Select.SelectTrigger>
          <Select.SelectValue placeholder="ชื่อตำแหน่งงาน" />
        </Select.SelectTrigger>
        <Select.SelectContent>
          <Select.SelectItem value="position">ชื่อตำแหน่งงาน</Select.SelectItem>
          <Select.SelectItem value="open-date">วันเปิดรับสมัคร</Select.SelectItem>
          <Select.SelectItem value="close-date">วันปิดรับสมัคร</Select.SelectItem>
        </Select.SelectContent>
      </Select.Select>
    </div>
  );
}
