import { clearCart, setCart } from "@/redux/features/cart/cartSlice";
import { removeUser, setCredentials } from "@/redux/features/user/userSlice";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const registerUser = async (
  register,
  userInfo,
  dispatch,
  createCart,
  resetUser,
  navigate
) => {
  const { data } = await register({
    first_name: userInfo.firstName,
    last_name: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
  });
  const accessToken = data.accessToken;

  if (accessToken) {
    Cookies.set("accessToken", accessToken);
    dispatch(setCredentials({ user: data.user }));
    const res = await createCart({
      userId: data.user._id,
      products: [],
    }).unwrap();
    dispatch(setCart({ _id: res._id, products: [] }));
    resetUser();
    toast.success(data.message);
    navigate("/");
  }
};

export const loginUser = async (
  login,
  userInfo,
  dispatch,
  getCart,
  resetUser,
  navigate
) => {
  try {
    const { data } = await login({
      email: userInfo.email,
      password: userInfo.password,
    });
    const accessToken = data.accessToken;
    if (accessToken) {
      Cookies.set("accessToken", accessToken);
      dispatch(setCredentials({ user: data.user }));
      const res = await getCart(data.user._id).unwrap();
      dispatch(setCart({ _id: res._id, products: res.products }));
      resetUser();
      toast.success(data.message);
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (logout, dispatch, navigate, onAction) => {
  try {
    const { message } = await logout().unwrap();
    Cookies.remove("accessToken");
    dispatch(clearCart());
    dispatch(removeUser());
    toast.success(message);
    navigate("/auth/login");
    
  } catch (err) {
    console.error("Logout failed:", err);
    alert("An error occurred while logging out. Please try again.");
  } finally {
    onAction?.();
  }
};
