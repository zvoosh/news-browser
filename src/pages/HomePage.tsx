import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  LatestThreeNews,
  NewsCard,
  TitleSections,
  Divider,
  LoadMoreButton,
  SavedSearchesActions,
  AllFilters,
  ErrorHandlerActions,
} from "@components";
import type { Article, GuardianResponse } from "@types";
import api from "@api";

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

  const {
    data,
    error,
    isError,
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

  // useMemo
  const firstThree = useMemo(() => data?.slice(0, 3), [data]);
  const rest = useMemo(() => data?.slice(3), [data]);
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

  // useCallback
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

  const handleSavedSearchClick = useCallback(() => {
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
    localStorage.setItem("savedSearches", JSON.stringify(newSavedSearches));
    const nesto = {
      value: JSON.stringify(newSavedSearches[newSavedSearches.length - 1]),
      label: `Search for ${newSavedSearches[newSavedSearches.length - 1].section}, ${newSavedSearches[newSavedSearches.length - 1].order}, ${newSavedSearches[newSavedSearches.length - 1].from ? `${newSavedSearches[newSavedSearches.length - 1].from},` : ""} ${newSavedSearches[newSavedSearches.length - 1].to ? `${newSavedSearches[newSavedSearches.length - 1].to},` : ""} ${newSavedSearches[newSavedSearches.length - 1].searchTerm ? `${newSavedSearches[newSavedSearches.length - 1].searchTerm},` : ""} page size:${newSavedSearches[newSavedSearches.length - 1].pageSize}`,
    };
    setSavedSearches(nesto.value);
  }, [section, order, from, to, searchTerm, pageSize]);

  const handleSavedSearchDelete = useCallback((searchOptionValue: string) => {
    const currentSavedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]",
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
    localStorage.setItem("savedSearches", JSON.stringify(newSavedSearches));
    setSavedSearches((prev: string | null | "") => {
      if (prev === null) return "";
      return null;
    });
  }, []);

  // Error handling
  if (isError) {
    return <ErrorHandlerActions error={error} refetch={refetch} />;
  }

  return (
    <div className="w-full h-full pt-30">
      <TitleSections />
      <Divider />
      <LatestThreeNews
        items={firstThree}
        handleOnClick={() => {
          setSection("world");
          setOrder("newest");
          setFrom(null);
          setTo(null);
          setSearchTerm("");
          setPageSize("10");
        }}
      />
      <Divider />
      <AllFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        section={section}
        handleSectionChange={handleSectionChange}
        order={order}
        handleOrderChange={handleOrderChange}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
      <SavedSearchesActions
        savedSearches={savedSearches}
        savedSearchesOptions={savedSearchesOptions}
        onChange={handleSavedSearchesChange}
        handleOnClick={handleSavedSearchClick}
        onDelete={handleSavedSearchDelete}
      />
      <NewsCard items={rest as Article[]} />
      <LoadMoreButton
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
}
