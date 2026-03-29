import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";

export default function ToDatePicker({
  to,
  from,
  setTo,
}: {
  to: Dayjs | null;
  from: Dayjs | null;
  setTo: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}) {
  return (
    <DatePicker
      value={to}
      onChange={(date: Dayjs | null) => {
        if (date) {
          setTo(date);
        } else {
          setTo(null);
        }
      }}
      placeholder="To"
      disabledDate={(current) =>
        from ? current && current.isBefore(from, "day") : false
      }
      className="w-full md:w-1/4"
    />
  );
}
