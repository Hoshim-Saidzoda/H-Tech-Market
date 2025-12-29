import React from "react";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlistStore();  
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const handleAddAllToCart = () => {
     items.forEach(product => {
      addToCart(product);
    });
    
     items.forEach(product => {
      removeFromWishlist(product.id);
    });
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto mt-20 p-4">
        <div className="sticky top-0 z-10">
          <div className="max-w-6xl mx-auto">
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
                Вернуться назад
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-24 h-24 mb-6 text-gray-300">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Список избранного пуст
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Добавляйте товары в избранное, чтобы не потерять их
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                     transition-colors duration-200 font-medium"
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-10">
   <div className="sticky top-0 z-10 bg-white border-b mt-20 border-gray-100">
  <div className="p-4 bg-blue-50 border border-blue-100">
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
       <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2.5 text-gray-600 hover:text-gray-900 w-full sm:w-auto"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium text-base px-3 py-1.5 rounded-lg 
              bg-blue-100 text-blue-700 hover:bg-blue-300 
              transition-colors duration-200 flex-1 text-center sm:text-left">
          Вернуться назад
        </span>
      </button>
      
       <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleContinueShopping}
          className="bg-white text-blue-600 px-5 py-2.5 rounded-lg hover:bg-blue-50 
                   transition-colors duration-200 font-medium border border-blue-200
                   w-full sm:w-auto"
        >
          Продолжить покупки
        </button>
        
        <button
          onClick={handleAddAllToCart}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 
                   transition-colors duration-200 font-medium
                   w-full sm:w-auto"
        >
          Добавить всё в корзину
        </button>
      </div>
    </div>
  </div>
</div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6 mb-20 max-w-[1200px] w-full">
          {items.map((product) => (
            <div key={product.id} className="flex justify-center w-75">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;