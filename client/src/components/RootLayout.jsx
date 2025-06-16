import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster richColors position="top-center" />
    </>
  );
};

export default RootLayout;
