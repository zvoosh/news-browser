import { useContext } from "react";
import { NewsCard } from "@components";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";
import type { IBookmark } from "@types";

export default function BookmarkPage() {
  const { bookmarks } = useContext(BookmakrsContext);
  const { isLight } = useContext(ThemeContext);

  return (
    <div className="w-full h-full pt-20">
      {bookmarks && bookmarks.length > 0 ? (
        <NewsCard items={bookmarks as IBookmark[]} />
      ) : (
        <div className={isLight ? "text-black" : "text-white"}>
          No Bookmarked Articles
        </div>
      )}
    </div>
  );
}
