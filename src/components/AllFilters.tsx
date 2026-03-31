import { ThemeContext } from "@context";
import {
  FromDatePicker,
  OrderPicker,
  SearchBar,
  SelectPageSize,
  SectionPicker,
  ToDatePicker,
} from "./formComponents";
import { useContext } from "react";
import type { Dayjs } from "dayjs";

export default function AllFilters({
  searchTerm,
  setSearchTerm,
  section,
  handleSectionChange,
  order,
  handleOrderChange,
  from,
  setFrom,
  to,
  setTo,
  pageSize,
  handlePageSizeChange,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  section: string;
  handleSectionChange: (value: string) => void;
  order: string;
  handleOrderChange: (value: string) => void;
  from: Dayjs | null;
  setFrom: (value: Dayjs | null) => void;
  to: Dayjs | null;
  setTo: (value: Dayjs | null) => void;
  pageSize: string;
  handlePageSizeChange: (value: string) => void;
}) {
  const { isLight } = useContext(ThemeContext);
  return (
    <div className="flex flex-col xl:flex-row gap-0 xl:gap-5 w-full">
      <div
        className={`w-full max-w-[600px] p-5 pb-0 sm:px-10 ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
      >
        <p className="font-semibold">Search the website for news</p>
        <div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <div
        className={`w-full p-5 sm:px-10  ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
      >
        <p className="font-semibold">Filters</p>
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <SectionPicker section={section} onChange={handleSectionChange} />
          <OrderPicker order={order} onChange={handleOrderChange} />
          <FromDatePicker from={from} setFrom={setFrom} />
          <ToDatePicker from={from} to={to} setTo={setTo} />
          <SelectPageSize pageSize={pageSize} onChange={handlePageSizeChange} />
        </div>
      </div>
    </div>
  );
}
