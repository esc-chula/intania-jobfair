import * as Select from "@/components/ui/select";

export default function SortSelector({
    sortOption,
    setSortOption,
}: {
    sortOption: "name" | "open-date" | "close-date";
    setSortOption: (v: "name" | "open-date" | "close-date") => void;
}) {
    return (
        <div className="flex justify-end items-center gap-2">
            <p className="text-primary-blue font-bodyTH">เรียงตาม</p>
            <Select.Select
                value={sortOption}
                onValueChange={(v) =>
                    setSortOption(v as "name" | "open-date" | "close-date")
                }
            >
                <Select.SelectTrigger className="bg-white">
                    <Select.SelectValue placeholder="ชื่อตำแหน่งงาน" />
                </Select.SelectTrigger>
                <Select.SelectContent>
                    <Select.SelectItem value="name">
                        <p className="font-bodyTH">ชื่อบริษัท (ค่าเริ่มต้น)</p>
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
