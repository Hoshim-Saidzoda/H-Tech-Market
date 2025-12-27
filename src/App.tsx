import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  const location = useLocation();

   const hideFooterRoutes = ["/cart"];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
