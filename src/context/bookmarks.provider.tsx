import { useEffect, useState } from "react";
import { BookmakrsContext } from "./bookmarks.context";
import { useQueryClient } from "@tanstack/react-query";
import type { IBookmark } from "@types";

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<IBookmark[]>(() => {
    const bookmarksLocalStorage = localStorage.getItem("bookmarks");
    return bookmarksLocalStorage ? JSON.parse(bookmarksLocalStorage) : [];
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  }, [bookmarks, queryClient]);

  const addBookmark = ({
    id,
    webUrl,
    webPublicationDate,
    fields: { thumbnail, headline, body, byline },
  }: IBookmark) => {
    setBookmarks((prev: IBookmark[]) => {
      const updated = prev.some((item) => item.id === id)
        ? prev
        : [
            ...prev,
            {
              id,
              webUrl,
              fields: { headline, thumbnail, body, byline },
              webPublicationDate,
            },
          ];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev: IBookmark[]) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BookmakrsContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmakrsContext.Provider>
  );
}
