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
        <Select.SelectTrigger className="w-full h-10">
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>

        {/* Content */}
        <Select.SelectContent className="w-full">
          <Select.SelectItem key={"ทั้งหมด"} value={"All"}>
            <p>ทั้งหมด</p>
          </Select.SelectItem>
          {groupedOptions.map((group) => (
            <Select.SelectGroup key={group.label}>
              <Select.SelectLabel className="text-xs text-muted-foreground px-2 py-1">
                {group.label}
              </Select.SelectLabel>

              {group.options.map((option) => (
                <Select.SelectItem
                  key={option.value}
                  value={option.value}
                  className="w-full h-9 text-left"
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
