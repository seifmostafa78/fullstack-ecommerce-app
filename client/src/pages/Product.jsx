import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../redux/features/cart/cartSlice";
import { useGetProductByIdQuery } from "../redux/features/product/productApiSlice";
import Newsletter from "../components/Newsletter";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@/components/ui/button";
import { useUpdateCartMutation } from "@/redux/features/cart/cartApiSlice";
import { getUser } from "@/redux/features/user/userSlice";
import { formattedProducts } from "@/lib/cart";
import CircularProgress from "@mui/material/CircularProgress";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import Cookies from "js-cookie";

const ProductPage = () => {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(productId);
  const [selection, setSelection] = useState({
    quantity: 1,
    color: "",
    size: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const cart = useSelector(getCart);
  const [updateCart, { isLoading: isAddToCartLoading }] =
    useUpdateCartMutation();

  useEffect(() => {
    if (product) {
      setSelection((prev) => ({
        ...prev,
        color: product.color[0],
        size: product.size[0],
      }));
    }
  }, [product]);

  const updateSelection = (key, value) => {
    setSelection((prev) => ({ ...prev, [key]: value }));
  };

  const handleQuantity = (type) => {
    setSelection((prev) => ({
      ...prev,
      quantity:
        type === "dec" && prev.quantity > 1
          ? prev.quantity - 1
          : prev.quantity + 1,
    }));
  };

  const handleClick = async () => {
    if (accessToken) {
      dispatch(
        addToCart({
          _id: product._id,
          price: product.price,
          img: product.img,
          title: product.title,
          ...selection,
        })
      );
      const cartPayload = formattedProducts(
        cart,
        product,
        selection,
        currentUser
      );
      const { data } = await updateCart({
        cartId: cart.cartId,
        cartData: cartPayload,
      });
      toast.success(data.message);
    } else {
      navigate("/auth/login");
    }
  };

  if (isLoading) return <Loader message="Loading Product..." />;
  if (isError)
    return (
      <p className="p-5 text-center text-red-500">
        {error?.data?.message || "Something went wrong while fetching product."}
      </p>
    );
  return (
    <main>
      <section className="flex flex-col sm:flex-row items-center p-4 sm:p-6 lg:px-12 pb-10 gap-8">
        <div className="flex-1 flex justify-center">
          <img
            src={product.img}
            alt={product.title}
            className="w-full max-w-md h-[40vh] sm:h-[70vh] object-cover"
          />
        </div>
        <div className="flex-1 px-4 lg:px-12 flex flex-col gap-6">
          <h1 className="text-2xl font-light">{product.title}</h1>
          <p className="text-gray-700">{product.desc}</p>
          <span className="text-4xl font-thin block">$ {product.price}</span>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:w-4/6 w-full">
            <div className="flex items-center gap-3">
              <span className="text-xl font-light">Color</span>
              <div className="flex items-center gap-1">
                {product.color?.map((c) => (
                  <div
                    key={c}
                    className={`w-5 h-5 rounded-full cursor-pointer border-2 ${
                      selection.color === c
                        ? "border-teal-600"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => updateSelection("color", c)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl font-light">Size</span>
              <select
                value={selection.size}
                className="border px-2 py-1 rounded-md"
                onChange={(e) => updateSelection("size", e.target.value)}
              >
                {product.size?.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 sm:w-4/6 w-full">
            <div className="flex items-center gap-3">
              <RemoveIcon
                className="cursor-pointer"
                onClick={() => handleQuantity("dec")}
              />
              <span className="w-8 h-8 border border-teal-600 rounded-md flex items-center justify-center font-bold">
                {selection.quantity}
              </span>
              <AddIcon
                className="cursor-pointer"
                onClick={() => handleQuantity("inc")}
              />
            </div>
            <Button
              onClick={handleClick}
              disabled={isAddToCartLoading}
              className="border-2 border-teal-600 bg-white hover:bg-gray-100 text-black px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAddToCartLoading && (
                <CircularProgress size={20} color="inherit" />
              )}
              ADD TO CART
            </Button>
          </div>
        </div>
      </section>
      <Newsletter />
    </main>
  );
};

export default ProductPage;
