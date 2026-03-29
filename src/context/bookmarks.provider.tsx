import { useState } from "react";
import { BookmakrsContext } from "./bookmarks.context";
import { useQueryClient } from "@tanstack/react-query";

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const bookmarksLocalStorage = localStorage.getItem("bookmarks");
    return bookmarksLocalStorage ? JSON.parse(bookmarksLocalStorage) : [];
  });
  const queryClient = useQueryClient();

  const addBookmark = async (id: string) => {
    await setBookmarks((prev) => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  };

  const removeBookmark = async (id: string) => {
    await setBookmarks((prev) => {
      const updated = prev.filter((item) => item !== id);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
  };

  return (
    <BookmakrsContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmakrsContext.Provider>
  );
}
