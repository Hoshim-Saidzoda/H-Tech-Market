import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useWishlistStore } from "../../store/wishlist.store";
import { Product } from "../../types/product";
 import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  const handleOpenProduct = () => {
    navigate(`/product/${product.id}`);
  };
  
  return (
    <div className="relative rounded  p-2 w-66 hover:shadow-lg transition">
      <img
        src={`http://37.27.29.18:8002/images/${product.image}`}
        alt={product.productName}
        className="w-100 h-80 mb-2 rounded-lg"
       onClick={handleOpenProduct} 
      />

      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-2 bg-white rounded-full shadow hover:bg-red-100 transition-colors p-1"
      >
        {inWishlist ? (
          <FavoriteIcon className="text-red-500" />
        ) : (
          <FavoriteBorderIcon className="text-gray-400 hover:text-red-500" />
        )}
      </button>

      <div className="flex items-center gap-2">
        <p className="text-[#e01357] font-bold">
          {product.discountPrice} ₽
        </p>
        
          <span className="text-gray-400 line-through">{product.price} ₽</span>
        
      </div>

      <h3 className="text-sm font-medium mb-1">{product.productName}</h3>
    </div>
  );
};

export default ProductCard;
