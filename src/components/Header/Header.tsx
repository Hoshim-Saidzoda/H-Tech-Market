import React, { useState } from "react";
import { User, Heart, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import CategoryList from "../../pages/Category/CategoryList";
import { AccountCircle, Login, Logout, FavoriteBorder } from '@mui/icons-material';
import Logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { items: wishlist } = useWishlistStore();
  const { totalCount } = useCartStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    setUser(null);
    setIsMobileMenuOpen(false);
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Logo"
            className="h-[42px] object-cover rounded-xl cursor-pointer 
                     border-2 border-transparent hover:border-blue-500/30 
                     transition-all duration-300 hover:scale-105"
            onClick={() => navigate("/")}
          />
        </div>

         <div className="hidden lg:flex items-center gap-6 flex-1 ml-6">
          <div className="relative">
            <button
              onClick={() => setIsCatalogOpen((p) => !p)}
              className="h-[44px] px-4 rounded-xl bg-blue-600 text-white font-semibold
                       flex items-center gap-2 hover:bg-blue-700 transition"
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
                  className="fixed inset-0 z-40 bg-black/10"
                  onClick={() => setIsCatalogOpen(false)}
                />
                <div className="fixed top-[90px] left-1/2 -translate-x-1/2 z-50
                      w-[95%] sm:w-[90%] md:w-[80%] lg:w-[90%] max-w-[1300px]">
                  <div className="bg-white rounded-2xl shadow-2xl p-6
                        max-h-[80vh] sm:max-h-[75vh] overflow-y-auto">
                    <CategoryList onSelect={() => setIsCatalogOpen(false)} />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex w-[500px] h-[44px] mx-55 border-2 border-blue-600 rounded-xl overflow-hidden">
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
        </div>

         <div className="hidden lg:flex gap-6 items-center">
          {user ? (
            <div className="flex items-center gap-2">
              <AccountCircle sx={{ fontSize: 32, color: '#005BFF' }} />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-gray-800">{user.name}</span>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="text-red-500 hover:underline text-left flex items-center gap-1"
                >
                  <Logout sx={{ fontSize: 14 }} />
                  <span>Выйти</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex flex-col items-center text-xs hover:text-blue-600 transition"
            >
              <Login sx={{ fontSize: 32 }} />
              <span>Войти</span>
            </button>
          )}

          <button
            onClick={() => navigate("/wishlist")}
            className="relative flex flex-col items-center text-xs hover:text-blue-600 transition"
          >
            <FavoriteBorder sx={{ fontSize: 22 }} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[15px] h-[15px] flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
            <span>Избранное</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="relative flex flex-col items-center text-xs hover:text-blue-600 transition"
          >
            <ShoppingCart size={24} className="text-gray-700" />
            {totalCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[15px] h-[15px] flex items-center justify-center rounded-full">
                {totalCount()}
              </span>
            )}
            <span>Корзина</span>
          </button>
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
  <>
     <div
      className="fixed h-200 inset-0 z-40 bg-black/50 lg:hidden"
      onClick={() => setIsMobileMenuOpen(false)}
    />
    
     <div className="fixed top-[72px] right-4 w-56 bg-white rounded-xl shadow-2xl z-50 p-4">
      <div className="space-y-3">
        <button
          onClick={() => {
            navigate(user ? "/profile" : "/login");
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 rounded-lg"
        >
          <User size={20} />
          <span className="font-medium">{user ? user.name : "Войти"}</span>
        </button>

        <button
          onClick={() => {
            setIsCatalogOpen(true);
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 rounded-lg"
        >
          <div className="grid grid-cols-2 gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-700 rounded-sm" />
            ))}
          </div>
          <span className="font-medium">Каталог</span>
        </button>

        <button
          onClick={() => {
            navigate("/wishlist");
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 rounded-lg"
        >
          <Heart size={20} />
          <div className="flex items-center justify-between flex-1">
            <span className="font-medium">Избранное</span>
            {wishlist.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>
        </button>

        <button
          onClick={() => {
            navigate("/cart");
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 rounded-lg"
        >
          <ShoppingCart size={20} />
          <div className="flex items-center justify-between flex-1">
            <span className="font-medium">Корзина</span>
            {totalCount() > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalCount()}
              </span>
            )}
          </div>
        </button>

        {user && (
          <button
            onClick={() => {
              setShowLogoutConfirm(true);
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 w-full text-left p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Logout size={20} />
            <span>Выйти</span>
          </button>
        )}
      </div>
    </div>
  </>
)}
         {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center mt-80 p-4">
            <div
              className="fixed inset-0 "
              onClick={() => setShowLogoutConfirm(false)}
            />
            <div className="bg-white rounded-2xl p-6   w-full max-w-md relative z-10">
              <div className="text-center  ">
                <div className="w-16 h-16 mx-auto mb-4   bg-red-100 rounded-full flex items-center justify-center">
                  <Logout sx={{ fontSize: 32, color: "#EF4444" }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Выйти из аккаунта?
                </h3>
                <p className="text-gray-600 mb-6">
                  Вы уверены, что хотите выйти из своего аккаунта?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

         {isCatalogOpen && (
          <div className="fixed inset-0 top-0 bg-white z-50">
            <div className="pt-[72px] h-170 bg-white overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Каталог</h1>
                  <button
                    onClick={() => setIsCatalogOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
                <CategoryList
                  onSelect={() => {
                    setIsCatalogOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;