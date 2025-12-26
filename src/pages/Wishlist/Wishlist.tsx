import React from "react";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import ProductCard from "../../components/ProductCard/ProductCard";
 import { useNavigate } from "react-router-dom";

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addManyToCart } = useCartStore();

  const handleAddAllToCart = () => {
    addManyToCart(items);

     items.forEach((item) => removeFromWishlist(item.id));
  };

  const navigate = useNavigate()
  
  return (
   <div className="max-w-7xl mx-auto mt-20 p-4">
       <div className="sticky top-0 z-10   border-gray-100">
  <div className="max-w-6xl mx-auto px-4">
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-2.5 py-4 text-gray-600 hover:text-gray-900"
    >
      <svg 
        className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15 19l-7-7 7-7" />
      </svg>
<span className="font-medium text-base font-bold px-3 py-1.5 rounded-lg 
                bg-blue-100 text-blue-700 hover:bg-blue-300 
                transition-colors duration-200">
Вернуться назад</span>    </button>
  </div>
</div>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
    <h1 className="text-xl font-bold">Избранное</h1>

    <button
      onClick={handleAddAllToCart}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Добавить всё в корзину
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {items.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</div>

  );
};

export default Wishlist;
