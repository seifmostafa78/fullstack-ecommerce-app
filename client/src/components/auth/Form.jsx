import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import {
  useCreateCartMutation,
  useLazyGetCartQuery,
} from "@/redux/features/cart/cartApiSlice";
import { loginUser, registerUser } from "@/lib/auth";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const formMode = location.pathname.split("/")[2];
  const [createCart] = useCreateCartMutation();
  const [getCart] = useLazyGetCartQuery();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const [
    register,
    {
      isError: isRegisterError,
      isLoading: isRegisterLoading,
      error: registerError,
    },
  ] = useRegisterMutation();

  const [
    login,
    { isError: isLoginError, isLoading: isLoginLoading, error: loginError },
  ] = useLoginMutation();

  const resetUser = () =>
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formMode === "register"
        ? await registerUser(
            register,
            userInfo,
            dispatch,
            createCart,
            resetUser,
            navigate
          )
        : await loginUser(
            login,
            userInfo,
            dispatch,
            getCart,
            resetUser,
            navigate
          );
    } catch (err) {
      console.log(err);
    }
  };

  const isLoading =
    formMode === "register" ? isRegisterLoading : isLoginLoading;

  const buttonText = formMode === "register" ? "Create account" : "Sign in";
  const errorMessage =
    (isRegisterError && registerError?.data?.message) ||
    (isLoginError && loginError?.data?.message);
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {formMode === "register" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={userInfo.firstName}
              onChange={handleChange}
              className="h-12 transition-all duration-200 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={userInfo.lastName}
              onChange={handleChange}
              className="h-12 transition-all duration-200 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
          className="h-12 transition-all duration-200 focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
          className="h-12 transition-all duration-200 focus:ring-2 focus:ring-teal-500"
          minLength={6}
          required
        />
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="text-center">
        {formMode === "register" ? (
          <Link
            to="/auth/login"
            className="text-xs text-gray-600 hover:text-teal-600 underline transition-colors duration-200"
          >
            DO YOU HAVE AN ACCOUNT?
          </Link>
        ) : (
          <Link
            to="/auth/register"
            className="text-xs text-gray-600 hover:text-teal-600 underline transition-colors duration-200"
          >
            CREATE A NEW ACCOUNT
          </Link>
        )}
      </div>

      {formMode === "register" && (
        <p className="text-xs text-gray-500 leading-relaxed">
          By creating an account, I consent to the processing of my personal
          data in accordance with the{" "}
          <span className="font-semibold">PRIVACY POLICY</span>
        </p>
      )}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading && <CircularProgress size={20} color="inherit" />}
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
