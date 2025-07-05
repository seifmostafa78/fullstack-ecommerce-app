import "./sidebar.scss";
import {
  Dashboard,
  PeopleOutline,
  Store,
  CreditCard,
  LocalShipping,
  InsertChart,
  NotificationsNone,
  SettingsSystemDaydreamOutlined,
  PsychologyOutlined,
  SettingsApplications,
  AccountCircleOutlined,
  ExitToApp,
} from "@mui/icons-material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../lib/auth";
import { useLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { useDispatch } from "react-redux";

const menuItems = [
  {
    title: "MAIN",
    items: [{ label: "Dashboard", icon: Dashboard, path: "/" }],
  },
  {
    title: "LISTS",
    items: [
      { label: "Users", icon: PeopleOutline, path: "/users" },
      { label: "Products", icon: Store, path: "/products" },
      { label: "Orders", icon: CreditCard },
      { label: "Delivery", icon: LocalShipping },
    ],
  },
  {
    title: "USEFUL",
    items: [
      { label: "Stats", icon: InsertChart },
      { label: "Notifications", icon: NotificationsNone },
    ],
  },
  {
    title: "SERVICE",
    items: [
      { label: "System Health", icon: SettingsSystemDaydreamOutlined },
      { label: "Logs", icon: PsychologyOutlined },
      { label: "Settings", icon: SettingsApplications },
    ],
  },
  {
    title: "USER",
    items: [
      { label: "Profile", icon: AccountCircleOutlined },
      { label: "Logout", icon: ExitToApp, action: "logout" },
    ],
  },
];

const SideBar = ({ toggleSidebar, isOpen }) => {
  const navigate = useNavigate();
  const logoutDispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleClick = (action) => {
    if (action === "logout") {
      logoutUser(logout, logoutDispatch, navigate);
    }
  };

  return (
    <aside
      className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}
    >
      <header className="sidebar__top">
        <Link to="/" className="sidebar__logo">
          Seifadmin
        </Link>
        <button className="sidebar__close-btn" onClick={toggleSidebar}>
          <CloseOutlinedIcon />
        </button>
      </header>

      <hr className="sidebar__divider" />

      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((section) => (
            <li key={section.title} className="sidebar__section">
              <p className="sidebar__section-title">{section.title}</p>
              <ul className="sidebar__section-items">
                {section.items.map(({ label, icon: Icon, path, action }) =>
                  path ? (
                    <Link to={path} key={label} className="sidebar__link link">
                      <li className="sidebar__item">
                        <Icon className="sidebar__icon" />
                        <span className="sidebar__label">{label}</span>
                      </li>
                    </Link>
                  ) : (
                    <li
                      key={label}
                      className="sidebar__item"
                      onClick={() => action && handleClick(action)}
                    >
                      <Icon className="sidebar__icon" />
                      <span className="sidebar__label">{label}</span>
                    </li>
                  )
                )}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
