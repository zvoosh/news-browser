import { useContext } from "react";
import { NewsCard } from "@components";
import { BookmakrsContext } from "@context/bookmarks.context";
import { ThemeContext } from "@context";

export default function BookmarkPage() {
  const { bookmarks } = useContext(BookmakrsContext);
  const { isLight } = useContext(ThemeContext);

  return (
    <div className="w-full h-full pt-20">
      <div className="pt-5 2xl:pt-20 flex flex-wrap justify-center max-w-[1400px] gap-10">
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((item, index) => <NewsCard item={item} key={index} />)
        ) : (
          <div className={isLight ? "text-black" : "text-white"}>
            No Bookmarked Articles
          </div>
        )}
      </div>
    </div>
  );
}
