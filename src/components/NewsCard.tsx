import { FaBookmark } from "react-icons/fa";
import type { Article, IBookmark } from "../types/types";
import TruncateParagraph from "./TruncateParagraph";
import dayjs from "dayjs";
import { useContext } from "react";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";
import { useNavigate } from "react-router";

const truncateText = (text: string, maxLength: number = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function NewsCard({ item }: { item: Article | IBookmark }) {
  const navigate = useNavigate();

  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmakrsContext);

  const { isLight } = useContext(ThemeContext);
  return (
    <div className="flex gap-4 border-b border-gray-400 pb-5 flex-col md:flex-row justify-center items-center">
      <div
        className="min-w-[275px] w-[375px] md:w-[275px] md:max-w-[275px] h-full max-h-[200px] overflow-hidden rounded-md px-5 md:px-0"
        onClick={() => {
          navigate(`/${truncateText(item.fields.headline, 10)}`, {
            state: { item: item },
          });
          const mainDiv = document.getElementById("main");
          if (mainDiv) {
            mainDiv.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        }}
      >
        {item.fields.thumbnail ? (
          <img
            src={item.fields.thumbnail}
            alt="news thumbnail"
            className="w-full h-full object-cover rounded-md transition duration-500 ease-in-out hover:scale-105 cursor-pointer select-none"
          />
        ) : (
          <div className="w-[275px] h-full max-h-[200px] bg-gray-500/40 flex items-center justify-center">
            No image found
          </div>
        )}
      </div>
      <div className="w-[375px] xl:w-[300px] 2xl:w-[375px] space-y-4 px-5 md:px-0">
        <h4
          className="text-xl font-bold cursor-pointer transform duration-200 ease-in-out hover:text-[#1677FF]"
          onClick={() => {
            navigate(`/${truncateText(item.fields.headline, 10)}`, {
              state: { item: item },
            });
            const mainDiv = document.getElementById("main");
            if (mainDiv) {
              mainDiv.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        >
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
              color={`${
                bookmarks.some((bookmark) => bookmark.id === item.id)
                  ? `${isLight ? "red" : "yellow"}`
                  : "gray"
              }`}
              className="cursor-pointer"
              onClick={() =>
                bookmarks.some((bookmark) => bookmark.id === item.id)
                  ? removeBookmark(item.id)
                  : addBookmark({
                      id: item.id,
                      fields: {
                        byline: item.fields.byline,
                        body: item.fields.body,
                        headline: item.fields.headline,
                        thumbnail: item.fields.thumbnail,
                      },
                      webPublicationDate: item.webPublicationDate,
                      webUrl: item.webUrl,
                    })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
