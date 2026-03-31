import { ThemeContext } from "@context";
import { useContext } from "react";

export default function Divider() {
  const { isLight } = useContext(ThemeContext);
  const dynamicBgStyle = {
    background: !isLight ? "white" : "black",
  };
  return (
    <div
      className="h-0.5 w-full relative left-0 mt-10 "
      style={dynamicBgStyle}
    ></div>
  );
}
