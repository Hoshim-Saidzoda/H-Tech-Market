import React, { useState } from "react";
import { User, Heart, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import CategoryList from "../../pages/Category/CategoryList";
import Logo from "../../assets/logo.png";
 const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { items: wishlist } = useWishlistStore();
  const { totalCount } = useCartStore();

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-[1940px] mx-auto px-4 h-[72px] flex items-center justify-between">
           <img
    src={Logo}
    alt="Logo"
    className="relative h-[42px] object-cover rounded-xl cursor-pointer 
             border-2 border-transparent group-hover:border-blue-500/30 
             transition-all duration-300 group-hover:scale-105"
    onClick={() => navigate("/")}
  />
 
         <div className="hidden lg:flex items-center gap-6 flex-1 ml-6">
           <div className="relative">
            <button
              onClick={() => setIsCatalogOpen((p) => !p)}
              className="h-[44px] px-4 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <div className="grid grid-cols-2 gap-[3px]">
                <span className="w-[6px] h-[6px] bg-white rounded-sm" />
                <span className="w-[6px] h-[6px] bg-white rounded-sm" />
                <span className="w-[6px] h-[6px] bg-white rounded-sm" />
                <span className="w-[6px] h-[6px] bg-white rounded-sm" />
              </div>
              Каталог
            </button>

          {isCatalogOpen && (
  <>
     <div
      className="fixed inset-0  z-40"
      onClick={() => setIsCatalogOpen(false)}
    />

     <div className="fixed top-[90px] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1300px]">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-h-[75vh] overflow-y-auto">
        <CategoryList onSelect={() => setIsCatalogOpen(false)} />
      </div>
    </div>
  </>
)}

          </div>

           <div className="flex flex-1 h-[44px] border-2 border-blue-600 rounded-xl overflow-hidden">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Искать товары"
              className="flex-1 px-4 text-sm outline-none"
            />
            <button
              onClick={() => navigate(`/search?q=${query}`)}
              className="w-[82px] bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition"
            >
              <Search size={20} />
            </button>
          </div>

           <div className="flex gap-6">
            {user ? (
              <div className="flex flex-col text-sm">
                <span className="font-medium">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:underline text-left"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex flex-col items-center text-xs hover:text-blue-600 transition"
              >
                <User size={22} />
                <span>Войти</span>
              </button>
            )}

            <button
              onClick={() => navigate("/wishlist")}
              className="relative flex flex-col items-center text-xs hover:text-blue-600 transition"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
              <span>Избранное</span>
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative flex flex-col items-center text-xs hover:text-blue-600 transition"
            >
              <ShoppingCart size={22} />
              {totalCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] px-1 rounded-full">
                  {totalCount()}
                </span>
              )}
              <span>Корзина</span>
            </button>
          </div>
        </div>

         <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setIsMobileMenuOpen((p) => !p)}
        >
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
        </button>

         {isMobileMenuOpen && (
          <div className="fixed top-[72px] right-4 w-48 bg-white rounded-xl shadow-xl z-[60] p-3 flex flex-col gap-3">
            <button
              onClick={() => navigate(user ? "/profile" : "/login")}
              className="flex items-center gap-2"
            >
              <User size={18} />
              {user ? user.name : "Войти"}
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="flex items-center gap-2"
            >
              <Heart size={18} /> Избранное ({wishlist.length})
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Корзина ({totalCount()})
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-500 text-left"
              >
                Выйти
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
 };

export default Header;
