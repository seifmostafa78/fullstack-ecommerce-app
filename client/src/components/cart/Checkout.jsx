import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMakePaymentMutation } from "../../redux/features/payment/paymentApiSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateCartMutation } from "@/redux/features/cart/cartApiSlice";

const Checkout = () => {
  const { cartId, products, total } = useSelector(getCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [makePayment, { isLoading }] = useMakePaymentMutation();
  const [stripeToken, setStripeToken] = useState(null);
  const [updateCart] = useUpdateCartMutation();

  useEffect(() => {
    sessionStorage.removeItem("orderId");
    sessionStorage.removeItem("orderCreated");
  }, []);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await makePayment({
          tokenId: stripeToken.id,
          amount: Math.round(total * 100),
        }).unwrap();
        dispatch(clearCart());
        await updateCart({
          cartId: cartId,
          cartData: { products: [] },
        });
        toast.success(res.message);
        navigate("/success", { state: { stripeData: res, products } });
      } catch (error) {
        console.log(error);
      }
    };
    if (stripeToken) makeRequest();
  }, [
    stripeToken,
    makePayment,
    navigate,
    products,
    total,
    dispatch,
    updateCart,
    cartId,
  ]);

  const formatCurrency = (number) => {
    const total = number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return total;
  };

  return (
    <div className="flex-1 border border-gray-300 rounded-xl p-6 h-[52vh] flex flex-col gap-6">
      <h1 className="text-2xl font-light">ORDER SUMMARY</h1>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="flex justify-between">
        <span>Estimated Shipping</span>
        <span>$0</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping Discount</span>
        <span>$0</span>
      </div>
      <div className="flex justify-between text-xl font-medium">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <StripeCheckout
        name="Online Shop"
        image="/imgs/logo.jpg"
        billingAddress
        shippingAddress
        description={`Your total is ${formatCurrency(total)}`}
        amount={Math.round(total * 100)}
        token={onToken}
        stripeKey={import.meta.env.VITE_STRIPE_KEY}
      >
        <Button
          disabled={isLoading}
          className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "CHECKOUT NOW"}
        </Button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
