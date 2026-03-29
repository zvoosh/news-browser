import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@api";
import { NewsCard, SearchBar } from "@components";
import type { Article } from "@types";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";

export default function BookmarkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { bookmarks } = useContext(BookmakrsContext);

  const { isLight } = useContext(ThemeContext);

  const { data, isError } = useQuery<Article[]>({
    queryKey: ["bookmarks", searchTerm],
    queryFn: async () => {
      const results = await Promise.all(
        bookmarks.map(async (id) => {
          const res = await api.get(
            `/${id}?show-fields=body,headline,byline,thumbnail&api-key=67a28272-3250-4204-b651-0a21af15a7d7`,
          );
          return res.data.response.content as Article;
        }),
      );
      return searchTerm
        ? results.filter((article) =>
            article.fields.headline
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
        : results;
    },
    enabled: bookmarks.length > 0,
  });

  if (isError) {
    return (
      <div className="w-full h-full text-white flex justify-center items-center mt-20">
        Error fetching news
      </div>
    );
  }
  return (
    <div className="w-full h-full pt-15 2xl:pt-30">
      {/* Filters */}
      <div className="flex gap-5 w-full justify-center xl:justify-start">
        <div
          className={`w-[600px] p-5  ${isLight ? "text-black" : "text-white"} rounded-xl mt-5 space-y-3`}
        >
          <p className="font-semibold">Search the website for news</p>
          <div>
            <SearchBar onSearch={setSearchTerm} />
          </div>
        </div>
      </div>
      {/* All Other News */}
      <div className="pt-5 2xl:pt-20 flex flex-wrap justify-center max-w-[1400px] gap-10">
        {data?.map((item, index) => (
          <NewsCard
            item={item}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
