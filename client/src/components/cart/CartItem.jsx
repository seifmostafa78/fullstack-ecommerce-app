import {
  decreaseQuantity,
  getCart,
  increaseQuantity,
} from "@/redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Remove, Add } from "@mui/icons-material";
import { formatDecrease, formatIncrease } from "@/lib/cart";
import { useUpdateCartMutation } from "@/redux/features/cart/cartApiSlice";
import { getUser } from "@/redux/features/user/userSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const cart = useSelector(getCart);
  const [updateCart] = useUpdateCartMutation();

  const handleClick = async (type) => {
    dispatch(
      type === "dec"
        ? decreaseQuantity({
            _id: product._id,
            color: product.color,
            size: product.size,
          })
        : increaseQuantity({
            _id: product._id,
            color: product.color,
            size: product.size,
          })
    );
    if (currentUser) {
      const cartPayload =
        type === "dec"
          ? formatDecrease(cart, product, currentUser)
          : formatIncrease(cart, product, currentUser);
      await updateCart({
        cartId: cart.cartId,
        cartData: cartPayload,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-3 pb-6">
        <div className="flex flex-col md:flex-row items-center gap-4 flex-1">
          <img
            src={product.img}
            alt="product"
            className="w-[200px] object-contain"
          />
          <div className="flex flex-col justify-around p-4 gap-4">
            <span>
              <b>Product:</b> {product.title}
            </span>
            <span>
              <b>ID:</b> {product._id}
            </span>
            <div
              className="w-5 h-5 rounded-full border border-teal-500"
              style={{ backgroundColor: product.color }}
            ></div>
            <span>
              <b>Size:</b> {product.size}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center">
            <Remove
              className="cursor-pointer"
              onClick={() => handleClick("dec")}
            />
            <span className="text-lg px-1">{product.quantity}</span>
            <Add
              className="cursor-pointer"
              onClick={() => handleClick("inc")}
            />
          </div>
          <span className="text-2xl font-light">$ {product.price}</span>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full md:w-[65vw]" />
    </div>
  );
};

export default CartItem;
