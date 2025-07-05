const PasswordField = ({
  label,
  name,
  placeholder,
  defaultValue,
  handleChange,
}) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="password"
        placeholder={placeholder}
        value={defaultValue}
        onChange={handleChange}
        className="form-input"
        minLength={6}
        required
      />
    </>
  );
};

export default PasswordField;
