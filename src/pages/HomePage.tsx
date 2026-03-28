import api from "@api/api";
import { useContext, useState } from "react";
import { ThemeContext } from "@context/theme.context";
import type { Article, GuardianResponse } from "../types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, DatePicker, Select, Spin } from "antd";
import NewsCard from "@components/NewsCard";
import LatestThreeNews from "@components/LatestThreeNews";
import Search from "antd/es/input/Search";
import type { Dayjs } from "dayjs";

export default function HomePage() {
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [to, setTo] = useState<Dayjs | null>(null);

  const { isDark } = useContext(ThemeContext);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GuardianResponse, Error, Article[]>({
    queryKey: ["users"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `search?q=climate&show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=${pageParam}&page-size=13`,
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1;
    },
    select: (data) => data.pages.flatMap((page) => page.response.results),
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Error loading news
      </div>
    );

  const firstThree = data?.slice(0, 3);
  const rest = data?.slice(3);

  const dynamicBgStyle = {
    backgroundColor: isDark ? "black" : "white",
  };

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
      {/* Latest Three News */}
      <LatestThreeNews items={firstThree} />
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
            <Select placeholder="Dropdown" className="w-1/4" />
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
      <div className="pt-20 flex flex-wrap max-w-[1400px] gap-10 justify-center">
        {rest && rest.map((item) => <NewsCard item={item} />)}
      </div>
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
