export const getInputsValues = (slug, product, user) => {
  const filledValues = {};
  if (slug === "products" && product) {
    filledValues["title"] = product.title || "";
    filledValues["desc"] = product.desc || "";
    filledValues["categories"] = product.categories?.join(", ") || "";
    filledValues["price"] = product.price?.toString() || "";
    filledValues["color"] = product.color?.join(", ") || "";
    filledValues["size"] = product.size?.join(", ") || "";
    filledValues["inStock"] = product.inStock ? "Available" : "Out of Stock";
  } else if (slug === "users" && user) {
    filledValues["first_name"] = user.first_name || "";
    filledValues["last_name"] = user.last_name || "";
    filledValues["email"] = user.email || "";
    filledValues["isAdmin"] = user.isAdmin || "";
  }
  return filledValues;
};
