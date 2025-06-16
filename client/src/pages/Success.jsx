import { useCreateOrderMutation } from "@/redux/features/order/orderApiSlice";
import { getUser } from "@/redux/features/user/userSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Order from "@/components/Order";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Success = () => {
  const location = useLocation();
  const { charge } = location.state.stripeData;
  const products = location.state.products;
  const user = useSelector(getUser);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [orderId, setOrderId] = useState(
    sessionStorage.getItem("orderId") || null
  );

  useEffect(() => {
    const create = async () => {
      const alreadyCreated = sessionStorage.getItem("orderCreated");
      if (!charge || alreadyCreated === "true") return;
      try {
        const { data } = await createOrder({
          userId: user._id,
          products: products.map((p) => ({
            productId: p._id,
            quantity: p.quantity,
          })),
          amount: charge.amount / 100,
          address: charge.billing_details.address,
        });
        setOrderId(data._id);
        sessionStorage.setItem("orderId", data._id);
        sessionStorage.setItem("orderCreated", "true");
      } catch (error) {
        console.log(error);
      }
    };
    charge && create();
  }, [createOrder, charge, products, user._id]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl !mx-auto">
        <div className="text-center !mb-8 animate-fade-in">
          <div className="flex justify-center !mb-4">
            <div className="relative">
              <CheckCircleIcon fontSize="large" className="w-20 h-20 text-green-500 animate-scale-in" />
              <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 !mb-2">
            Order Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl !mx-auto">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>
        </div>
        <Card className="!mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <LocalShippingIcon className="w-6 h-6 text-green-600" />
              Order Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <>
                    <AccessTimeIcon className="w-5 h-5 text-amber-500 animate-spin" />
                    <span className="text-gray-700">
                      Processing your order...
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Order confirmed</span>
                  </>
                )}
              </div>
              {orderId && (
                <Badge variant="secondary" className="text-sm font-mono">
                  Order #{orderId}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
        <Order charge={charge} products={products} />
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              <HomeIcon className="w-5 h-5 !mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ReceiptLongIcon className="w-5 h-5 !mr-2" />
            View Orders
          </Button>
        </div>
        <div className="!mt-8 text-center text-gray-600 animate-fade-in">
          <p className="!mb-1">
            We're thrilled to welcome you,{" "}
            <span className="font-semibold text-gray-800">
              {charge.billing_details.email}
            </span>
          </p>
          <p className="text-sm text-emerald-600">
            We appreciate your trust. Expect a delivery soon!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Success;
