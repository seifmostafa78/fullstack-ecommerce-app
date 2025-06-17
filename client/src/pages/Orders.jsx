import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import Order from "@/components/order/Order";
import { useSelector } from "react-redux";
import { getUser } from "@/redux/features/user/userSlice";
import { useOrdersQuery } from "@/redux/features/order/orderApiSlice";
import Loader from "@/components/Loader";

const Orders = () => {
  const user = useSelector(getUser);
  const { data: orders, isLoading, isError, error } = useOrdersQuery(user._id);

  if (isLoading) return <Loader message="Loading Orders..." />;
  if (isError)
    return (
      <p className="p-5 text-center text-red-500">{error}</p>
    );
  return (
    <div className="container !mx-auto px-4 py-8">
      <div className="text-center !mb-8">
        <h1 className="text-3xl font-bold text-gray-900 !mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your order history</p>
      </div>

      {orders && orders.length > 0 ? (
        <div className="!space-y-6">
          {orders.map((order) => (
            <Order
              key={order._id}
              id={order._id}
              address={order.address}
              products={order.products}
              amount={order.amount}
              status={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-gray-400 !mb-4" />
            <h3 className="text-lg font-medium text-gray-900 !mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
