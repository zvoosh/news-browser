import { Select } from "antd";

const pageSizeOptions = [
  { value: "10", label: "Page size: 10" },
  { value: "20", label: "Page size: 20" },
  { value: "50", label: "Page size: 50" },
];

export default function SectionPicker({
  pageSize,
  onChange
}: {
  pageSize: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      className="w-full md:w-1/4"
      placeholder="Page size"
      options={pageSizeOptions}
      defaultValue={pageSize}
      value={pageSize}
      onChange={onChange}
    />
  );
}
