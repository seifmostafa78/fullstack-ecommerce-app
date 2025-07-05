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

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const cart = useSelector(getCart);
  const [updateCart] = useUpdateCartMutation();

  const handleClick = async (type) => {
    dispatch(
      type === "dec"
        ? decreaseQuantity({
            _id: item._id,
            color: item.color,
            size: item.size,
          })
        : increaseQuantity({
            _id: item._id,
            color: item.color,
            size: item.size,
          })
    );
    if (currentUser) {
      const cartPayload =
        type === "dec"
          ? formatDecrease(cart, item, currentUser)
          : formatIncrease(cart, item, currentUser);
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
            src={item.img}
            alt="product"
            className="w-[200px] object-contain"
          />
          <div className="flex flex-col justify-around p-4 gap-4">
            <span>
              <b>Product:</b> {item.title}
            </span>
            <span>
              <b>ID:</b> {item._id}
            </span>
            <div
              className="w-5 h-5 rounded-full border border-teal-500"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>
              <b>Size:</b> {item.size}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex items-center">
            <Remove
              className="cursor-pointer"
              onClick={() => handleClick("dec")}
            />
            <span className="text-lg px-1">{item.quantity}</span>
            <Add
              className="cursor-pointer"
              onClick={() => handleClick("inc")}
            />
          </div>
          <span className="text-2xl font-light">$ {item.price}</span>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full md:w-[65vw]" />
    </div>
  );
};

export default CartItem;
