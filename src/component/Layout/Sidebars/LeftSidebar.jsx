import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { HiOutlineHome, HiOutlineUser, HiOutlineCog6Tooth } from "react-icons/hi2";
import { AuthContext } from "../../../context/AuthContext";

const links = [
  {
    to: "/",
    label: "Feed",
    icon: HiOutlineHome,
  },
  {
    to: "profile",
    label: "Profile",
    icon: HiOutlineUser,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: HiOutlineCog6Tooth,
  },
];

export default function LeftSidebar() {
  const { userId } = useContext(AuthContext);

  return (
    <aside className="sidebar-wrap" style={{ position: "sticky", top: "5.4rem", alignSelf: "start" }}>
      <div className="surface-card sidebar-card p-3">
        <div className="px-2 py-2">
          <p className="text-sm font-semibold text-[#1f3561]">Quick Menu</p>
        </div>

        <nav className="mt-1 flex flex-col gap-1">
          {links.map((item) => {
            const Icon = item.icon;
            const target = item.to === "profile" ? `/profile/${userId}` : item.to;

            return (
              <NavLink
                key={item.label}
                to={target}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
