import { Link, useLocation } from "react-router";
import { Switch } from "antd";
import { FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "@context/theme.context";

export default function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  return (
    <div
      className={`w-full h-20 border-b-2 border-[#1677FF] transition duration-200 ${isDark ? "bg-white text-black" : "bg-[#1b1d21] text-white"} flex justify-center text-lg`}
    >
      <div className="w-[1400px] h-full flex justify-between items-center">
        <div className="flex gap-10 items-baseline">
          <div className="font-extrabold text-4xl">
            <span className="text-[#1677FF]">News</span> Browser
          </div>
          <div className="flex gap-5 text-xl">
            <Link
              to={"/"}
              className={`px-2 py-1 rounded-md ${isDark ? (location.pathname === "/" ? "border-white bg-black text-white" : "") : location.pathname === "/" ? "border-gray-800 bg-white text-gray-800" : ""}`}
            >
              Home
            </Link>
            <Link
              to={"/bookmarks"}
              className={`px-2 py-1 rounded-md ${isDark ? (location.pathname === "/bookmarks" ? "border-white bg-black text-white" : "") : location.pathname === "/bookmarks" ? "border-gray-800 bg-white text-gray-800" : ""}`}
            >
              Bookmarks
            </Link>
          </div>
        </div>
        <div>
          <Switch
            checkedChildren={
              <FaSun
                style={{ display: "block", marginTop: "4px" }}
                className="scale-120"
              />
            }
            unCheckedChildren={
              <FaMoon
                style={{ display: "block", marginTop: "1px" }}
                className="scale-120"
              />
            }
            checked={isDark}
            onChange={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
}
