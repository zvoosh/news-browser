import api from "@api/api";
import { useContext } from "react";
import { ThemeContext } from "@context/theme.context";
import TruncateParagraph from "@components/TruncateParagraph";
import dayjs from "dayjs";
import type { GuardianResponse } from "../types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";

export default function HomePage() {
  const { isDark } = useContext(ThemeContext);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GuardianResponse>({
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
  });

  if (isLoading) return <div className="w-full h-screen flex justify-center items-center"><Spin/></div>;
  if (isError) return <div className="w-full h-screen flex justify-center items-center">Error loading news</div>;

  const allResults = data?.pages.flatMap((page) => page.response.results) ?? [];

  const firstThree = allResults.slice(0, 3);
  const rest = allResults.slice(3);

  const dynamicBgStyle = {
    backgroundColor: isDark ? "black" : "white",
  };

  return (
    <div className="w-full h-full pt-30">
      {/* title section */}
      <div className="max-w-[800px]">
        <h1 className="text-5xl font-medium leading-17">
          <span className="font-bold">Upgrade</span> your tech life with how-to{" "}
          <span className="font-bold">advice</span>,{" "}
          <span className="font-bold">news</span> and{" "}
          <span className="font-bold">tips</span>.
        </h1>
      </div>
      <div
        className="h-0.25 w-full relative left-0 mt-10 "
        style={dynamicBgStyle}
      ></div>
      {/* Latest News */}
      <div className="flex gap-5 mt-20 h-[525px] w-full">
        {/* Leva strana */}
        <div className="w-1/2 relative cursor-pointer">
          {firstThree[0] && (
            <>
              <img
                src={firstThree[0].fields.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl text-white">
                {firstThree[0].fields.headline}
              </div>
            </>
          )}
        </div>

        {/* Desna strana */}
        <div className="w-1/2 flex flex-col h-full divide-y-20 divide-transparent">
          <div className="w-full h-1/2 relative cursor-pointer">
            {firstThree[1] && (
              <>
                <img
                  src={firstThree[1].fields.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl text-white">
                  {firstThree[1].fields.headline}
                </div>
              </>
            )}
          </div>
          <div className="w-full h-1/2 relative cursor-pointer">
            {firstThree[2] && (
              <>
                <img
                  src={firstThree[2].fields.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 p-3 font-semibold text-xl bg-gray-500/20 w-full backdrop-blur-3xl text-white">
                  {firstThree[2].fields.headline}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="h-0.25 w-full relative left-0 mt-10 "
        style={dynamicBgStyle}
      ></div>
      <div className="pt-20 flex flex-wrap max-w-[1400px] gap-10">
        {rest.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border-b border-gray-400 pb-5"
          >
            <div className="w-[275px] overflow-hidden rounded-md">
              <img
                src={item.fields.thumbnail}
                alt=""
                className="w-full h-full object-cover rounded-md transition duration-500 ease-in-out hover:scale-105 cursor-pointer"
              />
            </div>
            <div className="w-[375px] space-y-4">
              <h4 className="text-xl font-bold cursor-pointer transform duration-200 ease-in-out hover:text-[#1677FF]">
                {item.fields.headline}
              </h4>
              <TruncateParagraph data={item.fields.body} />
              <div>
                <p className="font-semibold">{item.fields.byline}</p>
                <p className="text-gray-400">
                  {dayjs(item.webPublicationDate).format("MMM D[,] YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
