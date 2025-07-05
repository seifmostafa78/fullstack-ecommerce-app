import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RequireGuest = ({ children }) => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? <Navigate to="/" replace /> : children;
};

export default RequireGuest;
