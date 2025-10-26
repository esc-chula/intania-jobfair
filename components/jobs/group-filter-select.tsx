import * as Select from "@/components/ui/select";

type GroupedOptions = {
  label: string;
  options: { value: string; label: string }[];
};

export default function GroupedFilterSelector({
  filterOption,
  setFilterOption,
  placeholder,
  groupedOptions,
}: {
  filterOption: string;
  setFilterOption: (v: string) => void;
  placeholder: string;
  groupedOptions: GroupedOptions[];
}) {
  return (
    <div className="w-full">
      <Select.Select
        value={filterOption}
        onValueChange={(v) => setFilterOption(v as string)}
      >
        {/* Trigger */}
        <Select.SelectTrigger className="w-full bg-white font-bodyTH h-10">
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>

        {/* Content */}
        <Select.SelectContent className="w-full font-bodyTH">
          <Select.SelectItem key={"ทั้งหมด"} value={"All"}>
            <p className="font-bodyTH">ทั้งหมด</p>
          </Select.SelectItem>
          <Select.SelectSeparator />
          {groupedOptions.map((group) => (
            <Select.SelectGroup key={group.label}>
              <Select.SelectLabel className="font-bodyTH font-bold text-primary-blue">
                {group.label}
              </Select.SelectLabel>
              {group.options.map((option) => (
                <Select.SelectItem
                  key={option.value}
                  value={option.value}
                  className="w-full h-9 text-left font-bodyTH"
                >
                  {option.label}
                </Select.SelectItem>
              ))}

              <Select.SelectSeparator />
            </Select.SelectGroup>
          ))}
        </Select.SelectContent>
      </Select.Select>
    </div>
  );
}
