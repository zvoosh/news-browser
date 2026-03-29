import { useEffect, useState } from "react";
import { BookmakrsContext } from "./bookmarks.context";
import { useQueryClient } from "@tanstack/react-query";

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const bookmarksLocalStorage = localStorage.getItem("bookmarks");
    return bookmarksLocalStorage ? JSON.parse(bookmarksLocalStorage) : [];
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  }, [bookmarks]);

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

  return (
    <BookmakrsContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmakrsContext.Provider>
  );
}
