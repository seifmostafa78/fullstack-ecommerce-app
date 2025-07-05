const TextField = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  handleChange,
  readOnly,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handleChange}
        readOnly={readOnly}
        required
      />
    </>
  );
};

export default TextField;
