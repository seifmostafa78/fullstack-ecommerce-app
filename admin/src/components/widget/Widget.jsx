import "./widget.scss";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useUsersStatsQuery } from "../../redux/features/user/userApiSlice";
import {
  useIncomeQuery,
  useOrdersStatsQuery,
} from "../../redux/features/order/orderApiSlice";
import { useProductsStatsQuery } from "../../redux/features/product/productApiSlice";

const icons = {
  users: (
    <PersonOutlinedIcon
      className="icon"
      style={{ backgroundColor: "#ff000034", color: "red" }}
    />
  ),
  orders: (
    <ShoppingCartOutlinedIcon
      className="icon"
      style={{ backgroundColor: "#ffff0036", color: "goldenrod" }}
    />
  ),
  products: (
    <Inventory2OutlinedIcon
      className="icon"
      style={{ backgroundColor: "#80008034", color: "purple" }}
    />
  ),
  earnings: (
    <MonetizationOnOutlinedIcon
      className="icon"
      style={{ backgroundColor: "#00800034", color: "green" }}
    />
  ),
};

const widgetConfig = (type, stats) => {
  const calculateDiff = (stats) =>
    (stats[1]?.total * 100) / stats[0].total - 100;

  switch (type) {
    case "users":
      return {
        title: "USERS",
        amount: (stats && stats[1]?.total) || 0,
        diff: (stats && calculateDiff(stats)) || 0,
        isMoney: false,
        text: "See all users",
        link: "/users",
        icon: icons.users,
      };
    case "orders":
      return {
        title: "ORDERS",
        amount: (stats && stats[1].total) || 0,
        diff: (stats && calculateDiff(stats)) || 0,
        isMoney: false,
        text: "View all orders",
        link: "/users",
        icon: icons.orders,
      };
    case "products":
      return {
        title: "PRODUCTS",
        amount: (stats && stats[1].total) || 0,
        diff: (stats && (stats[1].total * 100) / stats[0].total - 100) || 0,
        isMoney: false,
        text: "See details",
        link: "/products",
        icon: icons.products,
      };
    case "earnings":
      return {
        title: "EARNINGS",
        amount: (stats && stats[1].total) || 0,
        diff: (stats && (stats[1].total * 100) / stats[0].total - 100) || 0,
        isMoney: true,
        text: "View net earnings",
        link: "/",
        icon: icons.earnings,
      };
    default:
      return {};
  }
};

const Widget = ({ type }) => {
  const { data: usersStats } = useUsersStatsQuery();
  const { data: ordersStats } = useOrdersStatsQuery();
  const { data: productsStats } = useProductsStatsQuery();
  const { data: income } = useIncomeQuery();

  const statsMap = {
    users: usersStats,
    orders: ordersStats,
    products: productsStats,
    earnings: income,
  };

  const data = widgetConfig(type, statsMap[type]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <Link to={data.link} className="link">
          <span>{data.text}</span>
        </Link>
      </div>
      <div className="right">
        <div
          className={`percentage ${data.diff >= 0 ? "positive" : "negative"}`}
        >
          {data.diff >= 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {Math.floor(data.diff)}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
