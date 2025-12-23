import React from "react";
import { User, Heart, ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Logo from "../../assets/logo.png";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { items: wishlist } = useWishlistStore();
  const { totalCount } = useCartStore();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <header className="border-b mask-linear-to-blue-50 border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center gap-4">

         <div className="flex flex-col leading-none mr-2 cursor-pointer">
  <img 
    src={Logo} 
    alt="Logo" 
    className="w-36 object-cover rounded-2xl " 
    style={{ height: "52px" }} 
  />
</div>


         <button className="h-[44px] px-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold flex items-center gap-2">
          <div className="grid grid-cols-2 gap-[3px]">
            <span className="w-[6px] h-[6px] bg-white rounded-sm" />
            <span className="w-[6px] h-[6px] bg-white rounded-sm" />
            <span className="w-[6px] h-[6px] bg-white rounded-sm" />
            <span className="w-[6px] h-[6px] bg-white rounded-sm" />
          </div>
          Каталог
        </button>

         <div className="flex flex-1 h-[44px] border-2 border-blue-600 rounded-xl overflow-hidden">
          <select className="px-3 text-sm outline-none">
            <option>Везде</option>
          </select>
          <input
            type="text"
            placeholder="Искать на Ozon"
            className="flex-1 px-4 text-sm outline-none"
          />
          <button className="w-[82px] bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition">
            <Search size={20} />
          </button>
        </div>

         <div className="flex gap-6 ml-2">
          {user ? (
            <div className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 cursor-pointer">
              <User size={22} />
              <span onClick={handleLogout}>Выйти</span>
              <span>{user.name}</span>
            </div>
          ) : (
            <div
              className="flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <User size={22} />
              <span>Войти</span>
            </div>
          )}

        <div
  onClick={() => navigate("/wishlist")}
  className="flex flex-col items-center gap-[2px] text-xs text-gray-700 hover:text-blue-600 cursor-pointer"
>
  <div className="relative w-6 h-6 flex items-center justify-center">
    <Heart size={22} />

    {wishlist.length > 0 && (
      <span className="absolute -top-[4px] -right-[4px] bg-red-500 text-white text-[9px] min-w-[14px] h-[14px] px-[3px] rounded-full flex items-center justify-center font-bold leading-none">
        {wishlist.length}
      </span>
    )}
  </div>

  <span className="leading-none">Избранное</span>
</div>

<div
  onClick={() => navigate("/cart")}
  className="relative flex flex-col items-center text-xs text-gray-700 hover:text-blue-600 cursor-pointer"
>
  <ShoppingCart size={22} />

   {totalCount() > 0 && (
      <span className="absolute -top-[8px] -right-[0px] bg-red-500 text-white text-[9px] min-w-[14px] h-[14px] px-[3px] rounded-full flex items-center justify-center font-bold leading-none">
      {totalCount()}
    </span>
  )}

  <span>Корзина</span>
</div>

        </div>

      </div>
    </header>
  );
};

export default Header;
