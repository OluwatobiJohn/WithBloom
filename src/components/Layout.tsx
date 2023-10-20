import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import useAuth from "../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleFalse = () => {
    setSidebarOpen(false);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { handleLogOut } = useAuth();
  return (
    <div className="flex">
      <TopBar handleLogOut={handleLogOut} toggleMobile={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleOut={toggleFalse}
        isMobile={isSmallScreen}
      />
      <main
        onClick={() => toggleFalse()}
        className="flex-1 p-4 bg-gray-100 my-custom-bg-class"
        style={{ marginTop: "3.5rem" }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
