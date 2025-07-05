import "./navbar.scss";
import {
  LanguageOutlined,
  NotificationsNoneOutlined,
  ChatBubbleOutlineOutlined,
  ListOutlined,
} from "@mui/icons-material";
import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import { Link } from "react-router-dom";

const iconItems = [
  {
    icon: <LanguageOutlined style={{ marginRight: "5px" }} />,
    text: "English",
    className: "navbar__item--lang",
  },
  {
    icon: <NotificationsNoneOutlined />,
    counter: 1,
  },
  {
    icon: <ChatBubbleOutlineOutlined />,
    counter: 2,
  },
  {
    icon: <ListOutlined />,
    className: "navbar__item--list",
  },
];

const NavBar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar__container">
        <button className="navbar__toggle-btn" onClick={toggleSidebar}>
          <AutoAwesomeMosaicOutlinedIcon />
        </button>

        <div className="navbar__items">
          {iconItems.map((item, index) => (
            <div key={index} className={`navbar__item ${item.className || ""}`}>
              {item.icon}
              {item.text && <span className="navbar__text">{item.text}</span>}
              {item.counter && (
                <span className="navbar__counter">{item.counter}</span>
              )}
            </div>
          ))}

          <Link to="/users" className="navbar__item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="User Avatar"
              className="navbar__avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
