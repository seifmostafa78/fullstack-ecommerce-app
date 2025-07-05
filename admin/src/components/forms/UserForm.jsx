import "./form.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../redux/features/user/userApiSlice";
import useFormFields from "../../hooks/useFormFields";
import FormFields from "../form-fields/FormFields";

const UserForm = ({ user, onUpdate }) => {
  const location = useLocation();
  const slug = location.pathname.split("/")[1];
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    isAdmin: user?.isAdmin || false,
  });
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const actionType = useMemo(() => (user ? "update" : "create"), [user]);
  const { getFormFields } = useFormFields(slug);

  useEffect(() => {
    if (user) {
      setFormValues(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...formValues,
      };
      console.log(userData);
      const { data } =
        actionType === "update"
          ? await updateUser({ id: user._id, userData })
          : await register(userData);

      actionType === "update" && onUpdate();
      toast.success(data.message);
      navigate("/users");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Upload failed:", error);
    }
  };

  const isLoading = actionType === "update" ? updateLoading : registerLoading;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <main className="formBody">
        <section className="formFields">
          {getFormFields().map((field) => {
            const fieldValue = formValues[field.name];
            return (
              <fieldset key={field.name} className="formGroup">
                <FormFields
                  {...field}
                  defaultValue={fieldValue}
                  handleChange={handleChange}
                  readOnly={actionType === "update" && field.name === "email"}
                />
              </fieldset>
            );
          })}
          {actionType === "create" && (
            <fieldset className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="abc123"
                value={formValues.password}
                onChange={handleChange}
              />
            </fieldset>
          )}
          <button type="submit" className="formSubmitBtn" disabled={isLoading}>
            {isLoading && <CircularProgress size={20} color="inherit" />}
            {actionType === "update" ? "Update" : "Create"}
          </button>
        </section>
      </main>
    </form>
  );
};

export default UserForm;
