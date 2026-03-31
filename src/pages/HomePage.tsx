import { useCallback, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
import type { Article, GuardianResponse, IFilters } from "@types";
import api from "@api";
import { Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const initialState = {
  from: null,
  pageSize: "10",
  searchTerm: "",
  to: null,
  section: "world",
  order: "newest",
};

const truncateText = (text: string, maxLength: number = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function HomePage() {
  const [filters, setFilters] = useState<IFilters>(initialState);
  const [open, setOpen] = useState<Article | null>(null);
  const [savedSearches, setSavedSearches] = useState<string | null | "">("");
  const navigate = useNavigate();
  const {
    data,
    error,
    isError,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GuardianResponse>({
    queryKey: [
      "articles",
      filters.section,
      filters.order,
      filters.from?.format("YYYY-MM-DD") || null,
      filters.to?.format("YYYY-MM-DD") || null,
      filters.searchTerm,
      filters.pageSize,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get(
        `search?q=${encodeURIComponent(filters.searchTerm)}&section=${filters.section}&show-fields=body,headline,byline,thumbnail&order-by=${filters.order}${filters.from ? `&from-date=${filters.from.format("YYYY-MM-DD")}` : ""}${filters.to ? `&to-date=${filters.to.format("YYYY-MM-DD")}` : ""}&api-key=67a28272-3250-4204-b651-0a21af15a7d7&page=${pageParam}&page-size=${filters.pageSize}`,
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
  });
  // useMemo
  const articles = useMemo(() => {
    return data?.pages.flatMap((page) => page.response.results) ?? [];
  }, [data]);
  const firstThree = useMemo(() => articles.slice(0, 3), [articles]);
  const rest = useMemo(() => articles.slice(3), [articles]);
  const savedSearchesOptions = useMemo(() => {
    const savedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]",
    );
    return savedSearches.map((search: IFilters) => ({
      value: JSON.stringify(search),
      label: `Search for ${search.section}, ${search.order}, ${search.from ? `${search.from},` : ""} ${search.to ? `${search.to},` : ""} ${search.searchTerm ? `${search.searchTerm},` : ""} page size: ${search.pageSize}`,
    }));
  }, [savedSearches]);

  // useCallback
  const handleReset = useCallback(() => {
    setFilters(initialState);
  }, []);

  const handleSavedSearchesChange = useCallback((value: string) => {
    setSavedSearches(value);

    if (value === "") {
      setFilters((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(initialState)) {
          return prev; // ❌ ne rerenderuj
        }
        return initialState;
      });
      return;
    }

    const parsed = JSON.parse(value);

    const newFilters = {
      section: parsed.section,
      order: parsed.order,
      from: parsed.from ? dayjs(parsed.from) : null,
      to: parsed.to ? dayjs(parsed.to) : null,
      searchTerm: parsed.searchTerm,
      pageSize: parsed.pageSize,
    };

    setFilters((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFilters)) {
        return prev;
      }
      return newFilters;
    });
  }, []);

  const handleSavedSearchClick = useCallback(() => {
    const currentSavedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]",
    );
    const newSavedSearches = [
      ...currentSavedSearches,
      {
        id: Date.now(),
        section: filters.section,
        order: filters.order,
        from: filters.from ? filters.from.format("YYYY-MM-DD") : null,
        to: filters.to ? filters.to.format("YYYY-MM-DD") : null,
        searchTerm: filters.searchTerm,
        pageSize: filters.pageSize,
      },
    ];
    localStorage.setItem("savedSearches", JSON.stringify(newSavedSearches));
    const nesto = {
      value: JSON.stringify(newSavedSearches[newSavedSearches.length - 1]),
      label: `Search for ${newSavedSearches[newSavedSearches.length - 1].section}, ${newSavedSearches[newSavedSearches.length - 1].order}, ${newSavedSearches[newSavedSearches.length - 1].from ? `${newSavedSearches[newSavedSearches.length - 1].from},` : ""} ${newSavedSearches[newSavedSearches.length - 1].to ? `${newSavedSearches[newSavedSearches.length - 1].to},` : ""} ${newSavedSearches[newSavedSearches.length - 1].searchTerm ? `${newSavedSearches[newSavedSearches.length - 1].searchTerm},` : ""} page size:${newSavedSearches[newSavedSearches.length - 1].pageSize}`,
    };
    setSavedSearches(nesto.value);
  }, [filters]);

  const handleSavedSearchDelete = useCallback((searchOptionValue: string) => {
    const currentSavedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]",
    );
    const newSavedSearches = currentSavedSearches.filter(
      (search: IFilters) => JSON.stringify(search) !== searchOptionValue,
    );
    localStorage.setItem("savedSearches", JSON.stringify(newSavedSearches));
    setSavedSearches((prev: string | null | "") => {
      if (prev === null) return "";
      return null;
    });
  }, []);

  if (isFetching) {
    return (
      <div className="mt-40 flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

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
        handleOnClick={handleReset}
        setOpen={setOpen}
      />
      <Divider />
      <AllFilters filters={filters} setFilters={setFilters} />
      <SavedSearchesActions
        savedSearches={savedSearches}
        savedSearchesOptions={savedSearchesOptions}
        onChange={handleSavedSearchesChange}
        handleOnClick={handleSavedSearchClick}
        onDelete={handleSavedSearchDelete}
      />
      <NewsCard items={rest as Article[]} setOpen={setOpen} />
      <LoadMoreButton
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
      <Modal
        title="Want to read the full article on The Guardian?"
        open={open !== null}
        onOk={() => {
          if (open?.webUrl) window.open(open.webUrl, "_blank");
          setOpen(null);
        }}
        onCancel={() => {
          if (open) {
            navigate(`/${truncateText(open?.fields.headline, 10)}`, {
              state: { item: open },
            });
            setOpen(null);
          }
        }}
        cancelText="No, I want to stay on News Browser"
        okText="Yes, take me to The Guardian"
      ></Modal>
    </div>
  );
}
