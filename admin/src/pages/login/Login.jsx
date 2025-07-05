import { useState } from "react";
import "./login.scss";
import { useLoginMutation } from "../../redux/features/auth/authApiSlice";
import { loginUser } from "../../lib/auth";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import useFormFields from "../../hooks/useFormFields";
import FormFields from "../../components/form-fields/FormFields";

const Login = () => {
  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { getFormFields } = useFormFields(slug);

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(login, userInfo, dispatch, navigate);
  };

  return (
    <main className="login-container">
      <div className="login-card">
        <h1 className="login-title">Seifadmin</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {getFormFields().map((field) => {
            const fieldValue = userInfo[field.name];
            return (
              <fieldset className="form-group">
                <FormFields
                  {...field}
                  defaultValue={fieldValue}
                  handleChange={handleChange}
                />
              </fieldset>
            );
          })}
          {isError && <p className="error">{error.data.message}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading && <CircularProgress size={20} color="inherit" />} Sign
            In
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
