import { useCallback, useContext, useMemo, useState } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import { Button, Spin } from "antd";
import {
  FromDatePicker,
  LatestThreeNews,
  NewsCard,
  OrderPicker,
  SectionPicker,
  ToDatePicker,
  SearchBar,
} from "@components";
import type { Article, GuardianResponse } from "@types";
import { ThemeContext } from "@context";
import api from "@api";

const selectArticles = (data: InfiniteData<GuardianResponse>) =>
  data.pages.flatMap((page) => page.response.results);

export default function HomePage() {
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [to, setTo] = useState<Dayjs | null>(null);
  const [section, setSection] = useState<string>("world");
  const [order, setOrder] = useState<string>("newest");

  const { isLight } = useContext(ThemeContext);

  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<GuardianResponse, Error, Article[]>({
      queryKey: ["articles", section, order, from, to, searchTerm],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await api.get(
          `search?q=${encodeURIComponent(searchTerm)}&section=${section}&show-fields=body,headline,byline,thumbnail&order-by=${order}${from ? `&from-date=${from.format("YYYY-MM-DD")}` : ""}${to ? `&to-date=${to.format("YYYY-MM-DD")}` : ""}&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=${pageParam}&page-size=13`,
        );
        return res.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.response.currentPage < lastPage.response.pages) {
          return lastPage.response.currentPage + 1;
        }
        return undefined;
      },

      select: selectArticles,
    });

  console.log("render");

  const firstThree = useMemo(() => data?.slice(0, 3), [data]);
  const rest = useMemo(() => data?.slice(3), [data]);

  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
  }, []);

  const handleOrderChange = useCallback((value: string) => {
    setOrder(value);
  }, []);

  const dynamicBgStyle = useMemo(
    () => ({ backgroundColor: isLight ? "black" : "white" }),
    [isLight],
  );

  if (isError) {
    return (
      <div className="w-full h-full text-white flex justify-center items-center mt-20">
        Error fetching news
      </div>
    );
  }
  return (
    <div className="w-full h-full pt-30">
      {/* title section */}
      <div className="max-w-[800px] px-5">
        <h1 className="text-5xl font-medium leading-17">
          <span className="font-bold">Upgrade</span> your life with how-to{" "}
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
      <div className="min-h-[525px] mt-20 px-5">
        <LatestThreeNews items={firstThree} />
      </div>
      {/* Divider */}
      <div
        className="h-0.25 w-full relative left-0 mt-10"
        style={dynamicBgStyle}
      ></div>
      {/* Filters */}
      <div className="flex flex-col xl:flex-row gap-0 xl:gap-5 w-full">
        <div
          className={`w-full max-w-[800px] p-5 pb-0 sm:px-10 ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
        >
          <p className="font-semibold">Search the website for news</p>
          <div>
            <SearchBar onSearch={setSearchTerm} />
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
          </div>
        </div>
      </div>
      {/* All Other News */}
      <div className="pt-8 2xl:pt-20 flex flex-wrap justify-center max-w-[1400px] gap-10">
        {rest?.map((item, index) => (
          <NewsCard item={item} key={index} />
        ))}
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
