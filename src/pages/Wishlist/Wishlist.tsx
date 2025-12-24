import React from "react";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import ProductCard from "../../components/ProductCard/ProductCard";
 

const Wishlist: React.FC = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addManyToCart } = useCartStore();

  const handleAddAllToCart = () => {
    addManyToCart(items);

     items.forEach((item) => removeFromWishlist(item.id));
  };

  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Избранное</h1>

        <button
          onClick={handleAddAllToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Добавить всё в корзину
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
