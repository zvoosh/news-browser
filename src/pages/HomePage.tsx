import api from "@api/api";
import { useCallback, useContext, useMemo, useState } from "react";
import { ThemeContext } from "@context/theme.context";
import type { Article, GuardianResponse } from "../types/types";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { Button, DatePicker, Select, Skeleton, Spin } from "antd";
import NewsCard from "@components/NewsCard";
import LatestThreeNews from "@components/LatestThreeNews";
import Search from "antd/es/input/Search";
import type { Dayjs } from "dayjs";

const sectionOptions = [
  { value: "technology", label: "Technology" },
  { value: "sport", label: "Sport" },
  { value: "business", label: "Business" },
  { value: "culture", label: "Culture" },
  { value: "science", label: "Science" },
  { value: "world", label: "World" },
];

const SectionPicker = ({
  section,
  onChange,
}: {
  section: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select
      className="w-1/4"
      placeholder="Select section"
      options={sectionOptions}
      defaultValue={section}
      onChange={onChange}
    />
  );
};
const selectArticles = (data: InfiniteData<GuardianResponse>) =>
  data.pages.flatMap((page) => page.response.results);

export default function HomePage() {
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);
  const [section, setSection] = useState<string>("world");

  const { isDark } = useContext(ThemeContext);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GuardianResponse, Error, Article[]>({
    queryKey: ["users", section],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `search?section=${section}&show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=${pageParam}&page-size=13`,
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    select: selectArticles,
  });

  console.log("render");

  const firstThree = useMemo(() => data?.slice(0, 3), [data]);
  const rest = useMemo(() => data?.slice(3), [data]);

  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
  }, []);

  const dynamicBgStyle = useMemo(
    () => ({ backgroundColor: isDark ? "black" : "white" }),
    [isDark],
  );

  return (
    <div className="w-full h-full pt-30">
      {/* title section */}
      <div className="max-w-[800px] px-5">
        <h1 className="text-5xl font-medium leading-17">
          <span className="font-bold">Upgrade</span> your tech life with how-to{" "}
          <span className="font-bold">advice</span>,{" "}
          <span className="font-bold">news</span> and{" "}
          <span className="font-bold">tips</span>.
        </h1>
      </div>
      {/* Divider */}
      <div
        className="h-0.25 w-full relative left-0 mt-10 "
        style={dynamicBgStyle}
      ></div>
      {/* Latest Three News */}{" "}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[525px] lg:h-[525px] mt-20">
          <Skeleton active />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-40">
          Error loading news
        </div>
      ) : (
        <LatestThreeNews items={firstThree} />
      )}
      {/* Divider */}
      <div
        className="h-0.25 w-full relative left-0 mt-10"
        style={dynamicBgStyle}
      ></div>
      {/* Filters */}
      <div className="flex gap-5 w-full">
        <div className="w-[800px] p-5 bg-gray-400/50 rounded-xl mt-5 space-y-3">
          <p className="font-semibold">Search the website for news</p>
          <div>
            <Search placeholder="Search..." />
          </div>
        </div>
        <div className="w-full p-5 bg-gray-400/50 rounded-xl mt-5 space-y-3">
          <p className="font-semibold">Filters</p>
          <div className="flex gap-3">
            <SectionPicker section={section} onChange={handleSectionChange} />
            <Select placeholder="Sorting" className="w-1/4" />
            <DatePicker
              value={from}
              onChange={(date) => setFrom(date)}
              placeholder="From"
              className="w-1/4"
            />
            <DatePicker
              value={to}
              onChange={(date) => setTo(date)}
              placeholder="To"
              disabledDate={(current) =>
                from ? current && current.isBefore(from, "day") : false
              }
              className="w-1/4"
            />
          </div>
        </div>
      </div>
      {/* All Other News */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Skeleton active />
        </div>
      ) : (
        <div className="pt-20 flex flex-wrap max-w-[1400px] gap-10 justify-center">
          {rest?.map((item, index) => (
            <NewsCard item={item} key={index} />
          ))}
        </div>
      )}
      {/* Load more Button */}
      <div className="w-full flex justify-center mt-10">
        {isFetchingNextPage ? (
          <Spin />
        ) : (
          <>
            {hasNextPage && (
              <Button
                type="primary"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Load more
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
