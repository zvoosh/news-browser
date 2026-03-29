import { FaBookmark } from "react-icons/fa";
import type { Article } from "../types/types";
import TruncateParagraph from "./TruncateParagraph";
import dayjs from "dayjs";
import { useState } from "react";

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const existing = localStorage.getItem("bookmarks");
    return existing ? JSON.parse(existing) : [];
  });

  const addBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((item) => item !== id);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return { bookmarks, addBookmark, removeBookmark };
};
export default function NewsCard({ item }: { item: Article }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  return (
    <div
      key={item.id}
      className="flex gap-4 border-b border-gray-400 pb-5 flex-col md:flex-row justify-center items-center"
    >
      <div className="min-w-[275px] md:w-[275px] max-w-[275px] h-full max-h-[200px] overflow-hidden rounded-md px-5 md:px-0">
        {item.fields.thumbnail ? (

          <img
          src={item.fields.thumbnail}
          alt="news thumbnail"
          className="w-full h-full object-cover rounded-md transition duration-500 ease-in-out hover:scale-105 cursor-pointer select-none"
          />
        ) : (<div className="w-[275px] p-10 py-30 h-full bg-white/40 text-center">No image found</div>)}
      </div>
      <div className="w-[375px] xl:w-[300px] 2xl:w-[375px] space-y-4 px-5 md:px-0">
        <h4 className="text-xl font-bold cursor-pointer transform duration-200 ease-in-out hover:text-[#1677FF]">
          {item.fields.headline}
        </h4>
        <TruncateParagraph data={item.fields.body} />
        <div className="flex justify-between items-end">
          <div>
            <p className="font-semibold">{item.fields.byline}</p>
            <p className="text-gray-400">
              {dayjs(item.webPublicationDate).format("MMM D[,] YYYY")}
            </p>
          </div>
          <div>
            <FaBookmark
              color={`${bookmarks.includes(item.id) ? "yellow" : "gray"}`}
              className="cursor-pointer"
              onClick={() =>
                bookmarks.includes(item.id)
                  ? removeBookmark(item.id)
                  : addBookmark(item.id)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
