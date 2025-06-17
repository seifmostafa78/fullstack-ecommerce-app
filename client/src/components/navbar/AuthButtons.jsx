import { useLogoutMutation } from "../../redux/features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/features/user/userSlice";
import { logoutUser } from "@/lib/auth";
import Cookies from "js-cookie";

const AuthButtons = ({ onAction }) => {
  const accessToken = Cookies.get("accessToken");
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = () => {
    logoutUser(logout, dispatch, navigate, onAction);
  };
  return (
    <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
      {accessToken ? (
        <>
          <div className="flex items-center text-sm font-medium text-muted-foreground">
            👋 Hello, {"  "}
            <span className="pl-1 text-primary">{user.first_name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isLoading}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/auth/register" className="link" onClick={onAction}>
            <Button variant="ghost" size="sm">
              Sign Up
            </Button>
          </Link>
          <Link to="/auth/login" className="link" onClick={onAction}>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
