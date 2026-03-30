import type { IBookmark } from "@types";
import { createContext } from "react";

interface BookmarksContextType {
  bookmarks: IBookmark[];
  addBookmark: (item: IBookmark) => void;
  removeBookmark: (id: string) => void;
}

export const BookmakrsContext = createContext<BookmarksContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});
