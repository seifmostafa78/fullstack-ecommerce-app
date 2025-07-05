import NavBar from "./navbar/NavBar";
import SideBar from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useState } from "react";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="app">
      <SideBar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="container">
        <NavBar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <Outlet />
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default RootLayout;
