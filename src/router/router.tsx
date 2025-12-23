import React from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
// import Catalog from "../pages/Catalog/Catalog";
// import Product from "../pages/Product/Product";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Account/Login";
import Register from "../pages/Account/Register";
 import Wishlist from "../pages/Wishlist/Wishlist";
 import ProductDetails from "../pages/ProductDetals/ProductDetails";
import CategoryList  from "../pages/Category/CategoryList";
import CategoryDetails from "../pages/Category/CategoryDetails";
import Colors from "../pages/Colors/Colors";
import Products from "../pages/Products/Products";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
    //   { path: "/catalog", element: <Catalog /> },
      { path: "/products", element: <Products /> },
      { path: "/product/:productId", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "*", element: <Navigate to="/" /> },  
      {
  path: "/wishlist",
  element: <Wishlist />
}
,
  { path: "/product/:id", element: <ProductDetails /> },
  { path: "/Category", element: <CategoryList /> },
      { path: "/category/:categoryId", element: <CategoryDetails /> },
{
  path: "/colors",
  element: <Colors />,
}
 
    ],
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
