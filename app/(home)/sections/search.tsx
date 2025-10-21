import Section from "../components/section";

export default function Search() {
  return (
    <Section title="ค้นหา" description="เริ่มต้นด้วยการพิมพ์คำที่สนใจ">
      <div className="flex gap-2">
        <input
          aria-label="ช่องค้นหา"
          placeholder="เช่น Production, Data, Backend"
          className="w-full rounded-md border px-3 py-2"
        />
        <button
          type="button"
          className="rounded-md border px-4 py-2"
          aria-label="ค้นหา"
        >
          ค้นหา
        </button>
      </div>
    </Section>
  );
}