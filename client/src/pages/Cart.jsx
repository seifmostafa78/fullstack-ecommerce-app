import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../redux/features/cart/cartSlice";
import Checkout from "../components/cart/Checkout";
import CartItem from "@/components/cart/CartItem";

const Cart = () => {
  const { products } = useSelector(getCart);
  return (
    <main className="px-4 py-6">
      <div className="text-center text-3xl font-light">YOUR BAG</div>
      <div className="hidden md:flex justify-between items-center p-4">
        <Link to="/">
          <button className="px-4 py-2 border border-black font-semibold hover:bg-wheat/30 transition cursor-pointer">
            CONTINUE SHOPPING
          </button>
        </Link>
        <div className="flex gap-4">
          <span className="underline">Shopping Bag(0)</span>
          <span className="underline">Your Wishlist (0)</span>
        </div>
        <button className="px-4 py-2 bg-black text-white font-semibold">
          CHECKOUT NOW
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-6 pt-6">
        <div className="flex-1">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <CartItem key={index} product={product} />
            ))
          ) : (
            <p className="text-center text-lg">
              your shopping cart is currently empty.
            </p>
          )}
        </div>

        <Checkout />
      </div>
    </main>
  );
};

export default Cart;
