import { FaBookmark } from "react-icons/fa";
import type { Article } from "../types/types";
import TruncateParagraph from "./TruncateParagraph";
import dayjs from "dayjs";
import { useContext } from "react";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";

export default function NewsCard({
  item,
  className = "",
}: {
  item: Article;
  className: string;
}) {
  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmakrsContext);

  const { isLight } = useContext(ThemeContext);
  return (
    <div
      className={`flex gap-4 border-b border-gray-400 pb-5 flex-col md:flex-row justify-center items-center ${className}`}
    >
      <div className="min-w-[275px] md:w-[275px] max-w-[275px] h-full max-h-[200px] overflow-hidden rounded-md px-5 md:px-0">
        {item.fields.thumbnail ? (
          <img
            src={item.fields.thumbnail}
            alt="news thumbnail"
            className="w-full h-full object-cover rounded-md transition duration-500 ease-in-out hover:scale-105 cursor-pointer select-none"
          />
        ) : (
          <div className="w-[275px] p-10 py-30 h-full bg-white/40 text-center">
            No image found
          </div>
        )}
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
              color={`${bookmarks.includes(item.id) ? `${isLight ? "red" : "yellow" }` : "gray"}`}
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
