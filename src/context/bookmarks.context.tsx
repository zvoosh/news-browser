import { createContext } from "react";

interface BookmarksContextType {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
}

export const BookmakrsContext = createContext<BookmarksContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});
