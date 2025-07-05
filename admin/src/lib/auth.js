import { removeUser, setCredentials } from "../redux/features/user/userSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const loginUser = async (
  login,
  userInfo,
  dispatch,
  navigate
) => {
  try {
    const { data } = await login({
      email: userInfo.email,
      password: userInfo.password,
    });
    const accessToken = data.accessToken;
    if (accessToken) {
      if (data.user.isAdmin) {
        Cookies.set("accessToken", accessToken);
        dispatch(setCredentials({ user: data.user }));
        navigate("/");
      } else {
        toast.error("you are not admin");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (logout, dispatch, navigate) => {
  try {
    const { message } = await logout().unwrap();
    Cookies.remove("accessToken");
    dispatch(removeUser());
    toast.success(message);
    navigate("/auth/login");
  } catch (err) {
    console.error("Logout failed:", err);
    alert("An error occurred while logging out. Please try again.");
  }
};
