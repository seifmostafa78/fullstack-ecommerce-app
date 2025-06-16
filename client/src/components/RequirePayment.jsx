import { Navigate, useLocation } from "react-router-dom";

const RequirePayment = ({ children }) => {
  const location = useLocation();
  const hasStripeData =
    location?.state?.stripeData && location?.state?.products;

  return hasStripeData ? children : <Navigate to="/" replace />;
};

export default RequirePayment;
