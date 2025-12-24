import { User, Heart, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Logo from "../../assets/logo.png";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import BrandFilter from "../../components/BrandCard/BrandCard";
import React, { useState } from "react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { items: wishlist } = useWishlistStore();
  const { totalCount } = useCartStore();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b fixed top-0 left-0 w-full z-50  border-gray-200  bg-[#ffffffd5]  z-50">
      <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center justify-between">
        <img
          src={Logo}
          alt="Logo"
          className="w-36 h-[42px] object-cover rounded-2xl cursor-pointer"
          onClick={() => navigate("/")}
        />

         <div className="hidden lg:flex items-center gap-6 flex-1 ml-6">
          <div className="relative">
            <button
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className="h-[44px] px-4 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2"
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
              <div className="absolute top-[52px] left-0 w-[320px] bg-white shadow-xl rounded-xl p-4 z-50">
                <BrandFilter
                  selectedBrand={selectedBrand}
                  onSelectBrand={(brand) => {
                    setSelectedBrand(brand);
                    setIsCatalogOpen(false);
                    navigate(`/products?brand=${brand}`);
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-1 h-[44px] border-2 border-blue-600 rounded-xl overflow-hidden">
            <select className="px-3 text-sm outline-none">
              <option>Везде</option>
            </select>
            <input
              type="text"
              placeholder="Искать на Ozon"
              className="flex-1 px-4 text-sm outline-none"
            />
            <button className="w-[82px] bg-blue-600 flex items-center justify-center text-white">
              <Search size={20} />
            </button>
          </div>

          <div className="flex gap-6">
             {user ? (
  <div className="flex flex-col items-start gap-1">
    <span className="text-sm font-medium">{user.name}</span>
    <button
      className="flex items-center gap-2 text-left text-red-500"
      onClick={handleLogout}
    >
      Выйти
    </button>
  </div>
) : (
  <button
    className="flex items-center gap-2 text-left"
    onClick={() => navigate("/login")}
  >
    Войти
  </button>
)}

            <div
              onClick={() => navigate("/wishlist")}
              className="relative flex flex-col items-center text-xs cursor-pointer"
            >
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
              <span>Избранное</span>
            </div>

            <div
              onClick={() => navigate("/cart")}
              className="relative flex flex-col items-center text-xs cursor-pointer"
            >
              <ShoppingCart size={22} />
              {totalCount() > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] px-1 rounded-full">
                  {totalCount()}
                </span>
              )}
              <span>Корзина</span>
            </div>
          </div>
        </div>

         <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
          <span className="w-6 h-[2px] bg-black" />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 w-44 bg-white shadow-lg rounded-lg z-50 p-3 flex flex-col gap-3">
            <button
              className="flex items-center gap-2 text-left"
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              <User size={20} /> {user ? user.name : "Войти"}
            </button>

            <button
              className="flex items-center gap-2 text-left"
              onClick={() => {
                navigate("/wishlist");
                setIsMobileMenuOpen(false);
              }}
            >
              <Heart size={20} /> Избранное {wishlist.length > 0 && `(${wishlist.length})`}
            </button>

            <button
              className="flex items-center gap-2 text-left"
              onClick={() => {
                navigate("/cart");
                setIsMobileMenuOpen(false);
              }}
            >
              <ShoppingCart size={20} /> Корзина ({totalCount()})
            </button>

           {user ? (
  <div className="flex flex-col items-start gap-1">
     <button
      className="flex items-center gap-2 text-left text-red-500"
      onClick={handleLogout}
    >
      Выйти
    </button>
  </div>
) : (
  <button
    className="flex items-center gap-2 text-left"
    onClick={() => navigate("/login")}
  >
    Войти
  </button>
)}

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
