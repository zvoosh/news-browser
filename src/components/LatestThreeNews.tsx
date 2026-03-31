import type { Article } from "../types/types";
import { FaBookmark } from "react-icons/fa";
import { useContext } from "react";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";

export default function LatestThreeNews({
  items,
  handleOnClick,
  setOpen,
}: {
  items?: Article[];
  handleOnClick: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<Article | null>>;
}) {

  const { bookmarks, addBookmark, removeBookmark } =
    useContext(BookmakrsContext);

  const { isLight } = useContext(ThemeContext);

  return (
    <div className="min-h-[525px] mt-20 px-5">
      {items && items.length > 0 ? (
        <div className="flex flex-col lg:flex-row lg:justify-center gap-5 min-h-[525px] lg:h-[525px] w-full">
          {/* Leva strana */}
          {items[0] && (
            <div
              className="w-full lg:w-1/2 relative cursor-pointer group"
              onClick={() => {
                if (setOpen) setOpen(items[0] as Article);
                const mainDiv = document.getElementById("main");
                if (mainDiv) {
                  mainDiv.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
            >
              {items[0].fields.thumbnail ? (
                <img
                  src={items[0].fields.thumbnail}
                  alt="news thumbnail"
                  className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                />
              ) : (
                <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                  No image found
                </div>
              )}
              <div
                className="absolute bottom-0 h-1/2 w-full 
                  bg-linear-to-t from-black to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
              ></div>
              <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white flex justify-between items-end">
                <span>{items[0].fields.headline}</span>
                <FaBookmark
                  color={`${
                    bookmarks.some((bookmark) => bookmark.id === items[0].id)
                      ? `${isLight ? "red" : "yellow"}`
                      : "gray"
                  }`}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      bookmarks.some((bookmark) => bookmark.id === items[0].id)
                    ) {
                      removeBookmark(items[0].id);
                    } else {
                      addBookmark({
                        id: items[0].id,
                        fields: {
                          byline: items[0].fields.byline,
                          body: items[0].fields.body,
                          headline: items[0].fields.headline,
                          thumbnail: items[0].fields.thumbnail,
                        },
                        webPublicationDate: items[0].webPublicationDate,
                        webUrl: items[0].webUrl,
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Desna strana */}
          <div className="w-full lg:w-1/2 flex flex-col h-full divide-y-20 divide-transparent">
            {items[1] && (
              <div
                className="w-full h-1/2 relative cursor-pointer group"
                onClick={() => {
                  if (setOpen) setOpen(items[1] as Article);
                  const mainDiv = document.getElementById("main");
                  if (mainDiv) {
                    mainDiv.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {items[1] && items[1].fields.thumbnail ? (
                  <img
                    src={items[1].fields.thumbnail}
                    className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                  />
                ) : (
                  <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                    No image found
                  </div>
                )}
                <div
                  className="absolute bottom-0 h-1/2 w-full 
                    bg-linear-to-t from-black to-transparent 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200"
                ></div>
                <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white flex justify-between items-end">
                  <span>{items[1].fields.headline}</span>
                  <FaBookmark
                    color={`${
                      bookmarks.some((bookmark) => bookmark.id === items[1].id)
                        ? `${isLight ? "red" : "yellow"}`
                        : "gray"
                    }`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        bookmarks.some(
                          (bookmark) => bookmark.id === items[1].id,
                        )
                      ) {
                        removeBookmark(items[1].id);
                      } else {
                        addBookmark({
                          id: items[1].id,
                          fields: {
                            byline: items[1].fields.byline,
                            body: items[1].fields.body,
                            headline: items[1].fields.headline,
                            thumbnail: items[1].fields.thumbnail,
                          },
                          webPublicationDate: items[1].webPublicationDate,
                          webUrl: items[1].webUrl,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            )}
            {items[2] && (
              <div
                className="w-full h-1/2 relative cursor-pointer group"
                onClick={() => {
                  if (setOpen) setOpen(items[2] as Article);
                  const mainDiv = document.getElementById("main");
                  if (mainDiv) {
                    mainDiv.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {items[2] && items[2].fields.thumbnail ? (
                  <img
                    src={items[2].fields.thumbnail}
                    alt="news thumbnail"
                    className="w-full h-full object-cover max-h-[355px] lg:max-h-none"
                  />
                ) : (
                  <div className="rounded-md w-full h-full bg-gray-500/40 flex justify-center items-center">
                    No image found
                  </div>
                )}
                <div
                  className="absolute bottom-0 h-1/2 w-full 
                  bg-linear-to-t from-black to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200"
                ></div>
                <div className="absolute bottom-0 p-3 font-semibold text-xl w-full backdrop-blur-3xl text-white flex justify-between items-end">
                  <span>{items[2].fields.headline}</span>
                  <FaBookmark
                    color={`${
                      bookmarks.some((bookmark) => bookmark.id === items[2].id)
                        ? `${isLight ? "red" : "yellow"}`
                        : "gray"
                    }`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        bookmarks.some(
                          (bookmark) => bookmark.id === items[2].id,
                        )
                      ) {
                        removeBookmark(items[2].id);
                      } else {
                        addBookmark({
                          id: items[2].id,
                          fields: {
                            byline: items[2].fields.byline,
                            body: items[2].fields.body,
                            headline: items[2].fields.headline,
                            thumbnail: items[2].fields.thumbnail,
                          },
                          webPublicationDate: items[2].webPublicationDate,
                          webUrl: items[2].webUrl,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No news found. Try adjusting your search criteria, or{" "}
          <span
            className="underline underline-offset-4 text-blue-400 cursor-pointer"
            onClick={handleOnClick}
          >
            click here to reset.
          </span>
        </div>
      )}
    </div>
  );
}
