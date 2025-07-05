import PasswordField from "./PasswordField";
import SelectField from "./SelectField";
import TextField from "./textField";

const FormFields = (props) => {
  const { type } = props;
  const renderField = () => {
    if (type === "text" || type === "email") {
      return <TextField {...props} />;
    }
    if (type === "password") {
      return <PasswordField {...props} />;
    }
    if (type === "select") {
      return <SelectField {...props} />;
    }
    return <TextField {...props} />;
  };
  return <>{renderField()}</>;
};

export default FormFields;
