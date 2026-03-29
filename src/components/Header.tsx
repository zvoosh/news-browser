import { Link, useLocation } from "react-router";
import { Switch } from "antd";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useContext, useState } from "react";
import { ThemeContext } from "@context/theme.context";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLight, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  return (
    <div
      className={`w-full h-20 fixed z-99 border-b-2 border-[#1677FF] transition duration-200 ${isLight ? "bg-white text-black" : "bg-[#1b1d21] text-white"} max-w-[1400px] text-lg`}
    >
      <div className="w-full max-w-[1400px] h-full flex justify-between items-baseline px-5 pt-3.5">
        <div className="flex gap-10 items-baseline">
          <div className="font-extrabold text-4xl">
            <span className="text-[#1677FF]">News</span> Browser
          </div>
          <div className="lg:flex gap-5 text-xl hidden">
            <Link
              to={"/"}
              className={`px-2 py-1 rounded-md ${isLight ? (location.pathname === "/" ? "border-white bg-black text-white" : "") : location.pathname === "/" ? "border-gray-800 bg-white text-gray-800" : ""}`}
            >
              Home
            </Link>
            <Link
              to={"/bookmarks"}
              className={`px-2 py-1 rounded-md ${isLight ? (location.pathname === "/bookmarks" ? "border-white bg-black text-white" : "") : location.pathname === "/bookmarks" ? "border-gray-800 bg-white text-gray-800" : ""}`}
            >
              Bookmarks
            </Link>
          </div>
          <div
            className={`flex flex-col w-full bg-gray-800/50 backdrop-blur-3xl overflow-hidden absolute z-100 left-0  px-7 pt-7 gap-7 text-center transition-all duration-300 ${isOpen ? "h-screen top-0" : "h-0 -top-20"}`}
          >
            <div className="flex justify-center items-baseline gap-7 w-full">
              <div className="font-extrabold text-4xl">
                <span className="text-[#1677FF]">News</span> Browser
              </div>
              <span>
                <FaBars onClick={() => setIsOpen((prev) => !prev)} />
              </span>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Link
                to={"/"}
                className={`w-full max-w-[300px] px-2 py-1 rounded-md ${isLight ? (location.pathname === "/" ? "border-white bg-black text-white" : "") : location.pathname === "/" ? "border-gray-800 bg-white text-gray-800" : ""}`}
              >
                Home
              </Link>
              <Link
                to={"/bookmarks"}
                className={`w-full max-w-[300px] px-2 py-1 rounded-md ${isLight ? (location.pathname === "/bookmarks" ? "border-white bg-black text-white" : "") : location.pathname === "/bookmarks" ? "border-gray-800 bg-white text-gray-800" : ""}`}
              >
                Bookmarks
              </Link>
            </div>
          </div>
        </div>
        <div className="block lg:hidden">
          <FaBars onClick={() => setIsOpen((prev) => !prev)} />
        </div>
        <div className="hidden lg:block">
          <Switch
            checkedChildren={
              <FaSun
                style={{ display: "block", marginTop: "4px" }}
                className="scale-120"
              />
            }
            unCheckedChildren={
              <FaMoon
                style={{
                  display: "block",
                  marginTop: "1px",
                  marginLeft: "2px",
                  color: "#1677FF",
                }}
                className="scale-120"
              />
            }
            checked={isLight}
            onChange={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
}
