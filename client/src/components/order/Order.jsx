import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Package, DollarSign } from "lucide-react";
import { formatAddress, formatDate, getStatusColor } from "@/lib/order";

const Order = ({
  id,
  address,
  products,
  amount,
  status,
  createdAt,
  updatedAt,
}) => {

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-lg">
              Order #{id.slice(-8)}
            </CardTitle>
            <div className="flex items-center gap-2 !mt-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-2">
            <Badge className={getStatusColor(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-lg">
                ${amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="!space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 !mb-2 flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products ({products.length} items)
          </h4>
          <div className="!space-y-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <span className="text-sm text-gray-600">Product ID:</span>
                  <span className="!ml-2 font-mono text-sm">
                    {product.productId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <span className="!ml-2 font-medium">{product.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium text-gray-900 !mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Shipping Address
          </h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              {formatAddress(address)}
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2">
          <p>Last updated: {formatDate(updatedAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Order;
