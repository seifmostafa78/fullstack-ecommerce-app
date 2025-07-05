const SelectField = ({ label, name, defaultValue, handleChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={defaultValue}
        onChange={handleChange}
      >
        {label === "Role" ? (
          <>
            <option value="false">User</option>
            <option value="true">Admin</option>
          </>
        ) : (
          <>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </>
        )}
      </select>
    </>
  );
};

export default SelectField;
