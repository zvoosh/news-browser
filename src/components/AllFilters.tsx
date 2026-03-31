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
import type { IFilters } from "@types";

export default function AllFilters({
  filters: { section, order, from, to, searchTerm, pageSize },
  setFilters,
}: {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}) {
  const { isLight } = useContext(ThemeContext);
  return (
    <div className="flex flex-col xl:flex-row gap-0 xl:gap-5 w-full">
      <div
        className={`w-full max-w-[600px] p-5 pb-0 sm:px-10 ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
      >
        <p className="font-semibold">Search the website for news</p>
        <div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={(value) => {
              setFilters((prev) => ({ ...prev, searchTerm: value }));
            }}
          />
        </div>
      </div>
      <div
        className={`w-full p-5 sm:px-10  ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
      >
        <p className="font-semibold">Filters</p>
        <div className="flex flex-wrap md:flex-nowrap gap-3">
          <SectionPicker
            section={section}
            onChange={(value) => {
              setFilters((prev) => ({ ...prev, section: value }));
            }}
          />
          <OrderPicker
            order={order}
            onChange={(value) => {
              setFilters((prev) => ({ ...prev, order: value }));
            }}
          />
          <FromDatePicker
            from={from}
            setFrom={(value) => {
              setFilters((prev) => ({ ...prev, from: value }));
            }}
          />
          <ToDatePicker
            from={from}
            to={to}
            setTo={(value) => {
              setFilters((prev) => ({ ...prev, to: value }));
            }}
          />
          <SelectPageSize
            pageSize={pageSize}
            onChange={(value) => {
              setFilters((prev) => ({ ...prev, pageSize: value }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
