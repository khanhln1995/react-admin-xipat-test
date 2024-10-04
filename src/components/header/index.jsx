import cn from "classnames";

import LogoCollapse from "../ui/LogoCollapse";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Get the current path
  const renderText = () => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      return "DASHBOARD";
    } else if (location.pathname === "/product") {
      return "PRODUCTS";
    } else if (location.pathname === "/setting") {
      return "SETTING";
    } else {
      return "UNKNOWN ROUTE";
    }
  };
  return (
    <header className="fixed top-0 z-40 w-full bg-white shadow">
      <div className="flex items-center px-5 md:px-8">
        <div className="relative flex w-full flex-1 items-center">
          <div className="flex items-center">
            <div
              className={cn(
                "flex h-16 shrink-0 transition-[width] duration-300 me-4 lg:h-[76px] lg:border-solid lg:border-gray-200/80 lg:me-8 lg:border-e lg:w-[257px]"
              )}
            >
              <LogoCollapse />
              {/* <Logo /> */}
            </div>
          </div>
          <div className="text-3xl font-bold">{renderText()}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
