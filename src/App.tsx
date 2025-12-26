 import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
 const App: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
       <Header />
        <Outlet />
        <Footer />
    </div>
  );
};

export default App;
