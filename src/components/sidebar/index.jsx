import SideBarItem from "./SideBarItem";
import { HomeIcon, ProductIcon, SettingsIcon } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";

function SideBar() {
  return (
    <aside className="fixed bottom-0 z-10  h-full w-72 bg-white shadow transition-[width] duration-300 pt-20 lg:w-76">
      <div className="flex h-full flex-col px-5 pt-6 pb-3">
        <div className="flex-grow">
          <SideBarItem
            icon={<Icon source={HomeIcon} />}
            to="/"
            text="Dashboard"
          />
          <SideBarItem
            icon={<Icon source={ProductIcon} />}
            to="/product"
            text="Product"
          />
        </div>
        <div className="py-5">
          <SideBarItem
            icon={<Icon source={SettingsIcon} tone="base" />}
            to="/setting"
            text="Setting"
          />
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
