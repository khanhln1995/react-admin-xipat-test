import { NavLink } from "react-router-dom";

function SideBarItem({ to, text, source, icon }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex w-full cursor-pointer items-center rounded-lg py-2 px-5 text-md ${
          isActive ? "bg-blue-200 text-blue-700" : "hover:bg-gray-200"
        }`
      }
      to={to}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2 text-lg">{icon}</span>}
        <span className="text-lg">{text}</span>
      </div>
    </NavLink>
  );
}

export default SideBarItem;
