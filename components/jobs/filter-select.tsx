import * as Select from "@/components/ui/select";

export default function FilterSelector({
  filterOption,
  setFilterOption,
  placeholder,
  options
}: {
  filterOption: string;
  setFilterOption: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="w-full"> {/* full width wrapper */}
      <Select.Select
        value={filterOption}
        onValueChange={(v) =>
          setFilterOption(v as string)
        }
      >
        <Select.SelectTrigger className="w-full h-10"> {/* make trigger full width */}
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>

        <Select.SelectContent className="w-full"> {/* content matches trigger width */}
          {options.map((option) => (
            <Select.SelectItem
              key={option.value}
              value={option.value}
              className="w-full h-10 text-left" /* full width + left align */
            >
              {option.label}
            </Select.SelectItem>
          ))}
        </Select.SelectContent>
      </Select.Select>
    </div>
  );
}