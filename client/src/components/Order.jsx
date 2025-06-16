import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const Order = ({ charge, products }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatAddress = (address) => {
    if (!address) return "N/A";
    return `${address.line1}${address.line2 ? `, ${address.line2}` : ""}, ${
      address.city
    }, ${address.postal_code}, ${address.country}`;
  };

  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <Card className="!mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ReceiptLongIcon className="w-5 h-5" />
            Order Summary
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="hover:bg-gray-100"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 !mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Inventory2Icon className="w-6 h-6 text-blue-600 !mx-auto !mb-2" />
            <div className="text-2xl font-bold text-blue-700">{totalItems}</div>
            <div className="text-sm text-blue-600">Items</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CreditCardIcon className="w-6 h-6 text-green-600 !mx-auto !mb-2" />
            <div className="text-2xl font-bold text-green-700">
              ${(charge.amount / 100).toFixed(2)}
            </div>
            <div className="text-sm text-green-600">Total</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <LocationOnIcon className="w-6 h-6 text-purple-600 !mx-auto !mb-2" />
            <div className="text-sm font-semibold text-purple-700">Delivery</div>
            <div className="text-xs text-purple-600">
              {charge.billing_details.address?.city || "N/A"}
            </div>
          </div>
        </div>
        {showDetails && (
          <div className="!space-y-4 animate-fade-in">
            <Separator />

            <div>
              <h4 className="font-semibold !mb-3">Items Ordered:</h4>
              <div className="!space-y-2">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">
                        {product.title}
                      </span>
                      <span className="text-gray-500 !ml-2">
                        ×{product.quantity}
                      </span>
                    </div>
                    <span className="font-semibold">
                      ${((product.price || 0) * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold !mb-2">Shipping Address:</h4>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  {formatAddress(charge.billing_details.address)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Order;
