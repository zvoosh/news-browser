import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

export default function FromDatePicker({
  from,
  setFrom,
}: {
  from: Dayjs | null;
  setFrom: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}) {
  return (
    <DatePicker
      value={from}
      onChange={(date: Dayjs | null) => {
        if (date) {
          setFrom(date);
        } else {
          setFrom(null);
        }
      }}
      placeholder="From"
      className="w-full md:w-1/4"
    />
  );
}
