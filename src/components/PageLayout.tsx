import { Outlet } from "react-router";
import Header from "./Header";

export default function PageLayout() {
  return (
    <div className="w-full max-w-[1400px]  h-full overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}
