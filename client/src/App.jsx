import Success from "./pages/Success";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductPage from "./pages/Product";
import ProductList from "./pages/ProductList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import RequireAuth from "./components/auth/RequireAuth";
import RequirePayment from "./components/RequirePayment";
import RequireGuest from "./components/auth/RequireGuest";
import Orders from "./pages/Orders";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="auth">
          <Route
            path="login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
          />
          <Route
            path="register"
            element={
              <RequireGuest>
                <Register />
              </RequireGuest>
            }
          />
        </Route>
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route
          path="cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="success"
          element={
            <RequirePayment>
              <Success />
            </RequirePayment>
          }
        />
        <Route
          path="orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
