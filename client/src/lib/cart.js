const isSameProduct = (p1, p2) =>
  p1._id === p2._id && p1.color === p2.color && p1.size === p2.size;

const mapToBackendFormat = (products) =>
  products.map((p) => ({
    productId: p._id,
    color: p.color,
    size: p.size,
    quantity: p.quantity,
  }));

export const formattedProducts = (cart, product, selection, currentUser) => {
  const updated = cart.products.filter(
    (p) => !isSameProduct(p, { ...product, ...selection })
  );

  const existingProduct = cart.products.find((p) =>
    isSameProduct(p, { ...product, ...selection })
  );

  const mergedProduct = {
    ...product,
    ...selection,
    quantity: existingProduct?.quantity
      ? selection.quantity + existingProduct.quantity
      : selection.quantity,
  };

  return {
    userId: currentUser._id,
    products: mapToBackendFormat([...updated, mergedProduct]),
  };
};

export const formatIncrease = (cart, product, currentUser) => {
  const updatedProducts = cart.products.map((p) =>
    isSameProduct(p, product) ? { ...p, quantity: p.quantity + 1 } : p
  );

  return {
    userId: currentUser._id,
    products: mapToBackendFormat(updatedProducts),
  };
};

export const formatDecrease = (cart, product, currentUser) => {
  const updatedProducts = cart.products
    .map((p) => {
      if (isSameProduct(p, product)) {
        const newQuantity = p.quantity - 1;
        return newQuantity > 0 ? { ...p, quantity: newQuantity } : null;
      }
      return p;
    })
    .filter(Boolean);

  return {
    userId: currentUser._id,
    products: mapToBackendFormat(updatedProducts),
  };
};
