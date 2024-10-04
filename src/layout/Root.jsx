import { Outlet } from "react-router-dom";
import Header from "../components/header";
import SideBar from "../components/sidebar";

function Root() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="relative flex w-full flex-col justify-start transition-[padding] duration-300 pt-20 ml-72">
          <div className=" p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Root;
