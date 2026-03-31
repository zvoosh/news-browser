import { Select } from "antd";

const sectionOptions = [
  { value: "technology", label: "Technology" },
  { value: "sport", label: "Sport" },
  { value: "business", label: "Business" },
  { value: "culture", label: "Culture" },
  { value: "science", label: "Science" },
  { value: "world", label: "World" },
];

export default function SectionPicker({
  section,
  onChange,
}: {
  section: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      className="w-full md:w-1/4"
      placeholder="Select section"
      options={sectionOptions}
      defaultValue={section}
      value={section}
      onChange={onChange}
    />
  );
}
