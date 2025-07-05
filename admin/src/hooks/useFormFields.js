const useFormFields = (slug) => {
  const loginFields = () => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      autoFocus: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];
  const userFields = () => [
    {
      label: "First Name",
      name: "first_name",
      type: "text",
      placeholder: "Seif",
    },
    {
      label: "Last Name",
      name: "last_name",
      type: "text",
      placeholder: "Mostafa",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
    },
    {
      label: "Role",
      name: "isAdmin",
      type: "select",
    },
  ];
  const productFields = () => [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Hoodie",
    },
    {
      label: "Description",
      name: "desc",
      type: "text",
      placeholder: "this is a hoodie",
    },
    {
      label: "Price",
      name: "price",
      type: "text",
      placeholder: "0.00",
    },
    {
      label: "In Stock",
      name: "inStock",
      type: "select",
    },
  ];
  const getFormFields = () => {
    switch (slug) {
      case "login":
        return loginFields();
      case "users":
        return userFields();
      case "products":
        return productFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
