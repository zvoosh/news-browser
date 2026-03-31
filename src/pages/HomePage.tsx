import { useCallback, useContext, useMemo, useState } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Alert, Button, Result, Spin } from "antd";
import {
  FromDatePicker,
  LatestThreeNews,
  NewsCard,
  OrderPicker,
  SectionPicker,
  ToDatePicker,
  SearchBar,
  SelectPageSize,
  SavedSearches,
} from "@components";
import type { Article, GuardianResponse } from "@types";
import { ThemeContext } from "@context";
import api from "@api";

type ApiError = {
  response?: {
    status: number;
    statusText?: string;
    data?: unknown;
  };
};
function isApiError(err: unknown): err is ApiError {
  return typeof err === "object" && err !== null && "response" in err;
}

const selectArticles = (data: InfiniteData<GuardianResponse>) =>
  data.pages.flatMap((page) => page.response.results);

export default function HomePage() {
  const [from, setFrom] = useState<Dayjs | null>(null);
  const [pageSize, setPageSize] = useState<string>("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [to, setTo] = useState<Dayjs | null>(null);
  const [section, setSection] = useState<string>("world");
  const [order, setOrder] = useState<string>("newest");
  const [savedSearches, setSavedSearches] = useState<string | null | "">("");

  const { isLight } = useContext(ThemeContext);

  const {
    data,
    error,
    isError,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GuardianResponse, Error, Article[]>({
    queryKey: ["articles", section, order, from, to, searchTerm, pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `search?q=${encodeURIComponent(searchTerm)}&section=${section}&show-fields=body,headline,byline,thumbnail&order-by=${order}${from ? `&from-date=${from.format("YYYY-MM-DD")}` : ""}${to ? `&to-date=${to.format("YYYY-MM-DD")}` : ""}&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=${pageParam}&page-size=${pageSize}`,
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
    retry: false,
    select: selectArticles,
  });

  const savedSearchesOptions = useMemo(() => {
    const savedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]",
    );
    return savedSearches.map(
      (search: {
        id: Date;
        section: string;
        order: string;
        from: Dayjs | null;
        to: Dayjs | null;
        searchTerm: string;
        pageSize: string;
      }) => ({
        value: JSON.stringify(search),
        label: `Search for ${search.section}, ${search.order}, ${search.from ? `${search.from},` : ""} ${search.to ? `${search.to},` : ""} ${search.searchTerm ? `${search.searchTerm},` : ""} page size: ${search.pageSize}`,
      }),
    );
  }, [savedSearches]);

  const firstThree = useMemo(() => data?.slice(0, 3), [data]);
  const rest = useMemo(() => data?.slice(3), [data]);

  const handleSectionChange = useCallback((value: string) => {
    setSection(value);
  }, []);

  const handleOrderChange = useCallback((value: string) => {
    setOrder(value);
  }, []);

  const handlePageSizeChange = useCallback((value: string) => {
    setPageSize(value);
  }, []);

  const handleSavedSearchesChange = useCallback((value: string) => {
    setSavedSearches(value);
    if (value === "") {
      setSection("world");
      setOrder("newest");
      setFrom(null);
      setTo(null);
      setSearchTerm("");
      setPageSize("10");
      return;
    }
    const parsed = JSON.parse(value);
    setSection(parsed.section);
    setOrder(parsed.order);
    setFrom(parsed.from ? dayjs(parsed.from) : null);
    setTo(parsed.to ? dayjs(parsed.to) : null);
    setSearchTerm(parsed.searchTerm);
    setPageSize(parsed.pageSize);
  }, []);

  const dynamicBgStyle = useMemo(
    () => ({ backgroundColor: isLight ? "black" : "white" }),
    [isLight],
  );
  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (isError) {
    if (isApiError(error) && error.response?.status === 429) {
      return (
        <div className="mt-25">
          <Alert
            message="Rate limit exceeded"
            description="Too many requests have been made in a short period. Please wait a moment and try again."
            type="warning"
            showIcon
          />
        </div>
      );
    }

    return (
      <div className="mt-20">
        <Result
          status="error"
          title={
            <span className={`${isLight ? "text-black" : "text-white"}`}>
              Network Error
            </span>
          }
          subTitle={
            <span className={`${isLight ? "text-black" : "text-white"}`}>
              Something went wrong. Please check your connection and try again.
            </span>
          }
          extra={[
            <Button type="primary" onClick={() => refetch()} key="retry">
              Retry
            </Button>,
          ]}
        />
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
      {/* Latest Three News */}
      <div className="min-h-[525px] mt-20 px-5">
        {firstThree && firstThree.length > 0 ? (
          <LatestThreeNews items={firstThree} />
        ) : (
          <div className="text-center text-gray-500">
            No news found. Try adjusting your search criteria, or{" "}
            <span
              className="underline underline-offset-4 text-blue-400 cursor-pointer"
              onClick={() => {
                setSection("world");
                setOrder("newest");
                setFrom(null);
                setTo(null);
                setSearchTerm("");
                setPageSize("10");
              }}
            >
              click here to reset
            </span>
            .
          </div>
        )}
      </div>
      {/* Divider */}
      <div
        className="h-0.25 w-full relative left-0 mt-10"
        style={dynamicBgStyle}
      ></div>
      {/* Filters */}
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
            <SelectPageSize
              pageSize={pageSize}
              onChange={handlePageSizeChange}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex px-10 gap-5">
        <Button
          type="primary"
          onClick={() => {
            const currentSavedSearches = JSON.parse(
              localStorage.getItem("savedSearches") || "[]",
            );
            const newSavedSearches = [
              ...currentSavedSearches,
              {
                id: Date.now(),
                section,
                order,
                from: from ? from.format("YYYY-MM-DD") : null,
                to: to ? to.format("YYYY-MM-DD") : null,
                searchTerm,
                pageSize,
              },
            ];
            localStorage.setItem(
              "savedSearches",
              JSON.stringify(newSavedSearches),
            );
            const nesto = {
              value: JSON.stringify(
                newSavedSearches[newSavedSearches.length - 1],
              ),
              label: `Search for ${newSavedSearches[newSavedSearches.length - 1].section}, ${newSavedSearches[newSavedSearches.length - 1].order}, ${newSavedSearches[newSavedSearches.length - 1].from ? `${newSavedSearches[newSavedSearches.length - 1].from},` : ""} ${newSavedSearches[newSavedSearches.length - 1].to ? `${newSavedSearches[newSavedSearches.length - 1].to},` : ""} ${newSavedSearches[newSavedSearches.length - 1].searchTerm ? `${newSavedSearches[newSavedSearches.length - 1].searchTerm},` : ""} page size:${newSavedSearches[newSavedSearches.length - 1].pageSize}`,
            };
            setSavedSearches(nesto.value);
          }}
        >
          Save Search
        </Button>
        <SavedSearches
          savedSearches={savedSearches}
          onChange={handleSavedSearchesChange}
          savedSearchesOptions={savedSearchesOptions}
          onDelete={(searchOptionValue) => {
            const currentSavedSearches = JSON.parse(
              localStorage.getItem("savedSearches") || "[]",
            );
            console.log(
              searchOptionValue,
              JSON.stringify(currentSavedSearches[0]),
            );
            const newSavedSearches = currentSavedSearches.filter(
              (search: {
                id: Date;
                section: string;
                order: string;
                from: string | null;
                to: string | null;
                searchTerm: string;
                pageSize: number;
              }) => JSON.stringify(search) !== searchOptionValue,
            );
            localStorage.setItem(
              "savedSearches",
              JSON.stringify(newSavedSearches),
            );
            setSavedSearches((prev: string | null | "") => {
              if (prev === null) return "";
              return null;
            });
          }}
        />
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
