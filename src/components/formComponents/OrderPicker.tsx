import { Select } from "antd";

const orderOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "relevance", label: "Relevance" },
];

export default function OrderPicker({
  order,
  onChange,
}: {
  order: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      className="w-full md:w-1/4"
      placeholder="Select order"
      options={orderOptions}
      defaultValue={order}
      onChange={onChange}
    />
  );
}
