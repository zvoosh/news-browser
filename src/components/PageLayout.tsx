import { Outlet } from "react-router";
import Header from "./Header";

export default function PageLayout() {
  return (
    <div className="w-screen h-full overflow-hidden">
      <Header />
      <div className="flex justify-center">
        <div className="w-screen max-w-[1400px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
