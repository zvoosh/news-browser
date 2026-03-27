import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import PageLayout from "@components/PageLayout";
import HomePage from "@pages/HomePage";
import BookmarkPage from "@pages/BookmarkPage";
import { useContext } from "react";
import { ThemeContext } from "@context/theme.context";

function App() {
  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`w-screen h-screen overflow-hidden overflow-y-auto flex justify-center transition duration-200 ${isDark ? "bg-white text-black" : "bg-[#1b1d21] text-white"}`}
    >
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route index element={<SingleNewsPage />} /> */}
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
