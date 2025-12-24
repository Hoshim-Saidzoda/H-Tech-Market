import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import ColorFilter from "../ColorFilter/ColorFilter";
import Rating from "@mui/material/Rating";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.colorName || null
  );

  const handleAddToCart = () => {
     addToCart({ ...product  });
  };

  return (
    <div className="relative group rounded p-2 w-70 hover:shadow-lg transition">
      <img
        src={`https://store-api.softclub.tj/images/${product.image}`}
        alt={product.productName}
        className="w-full h-80 mb-2 rounded-lg cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      />

       <button
        onClick={() =>
          isInWishlist(product.id)
            ? removeFromWishlist(product.id)
            : addToWishlist(product)
        }
        className="absolute top-4 right-2 bg-white rounded-full shadow p-1"
      >
        {isInWishlist(product.id) ? (
          <FavoriteIcon className="text-red-500" />
        ) : (
          <FavoriteBorderIcon className="text-gray-400" />
        )}
      </button>

       <button
        onClick={handleAddToCart}
        className="
          absolute bottom-24 left-1/2 -translate-x-1/2
          bg-blue-50 text-gray-950 px-2 py-4 rounded
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        Добавить в корзину
      </button>

      <div className="flex items-center gap-2 mt-2">
        <p className="text-[#e01357] font-bold">{product.discountPrice} ₽</p>
           <span className="text-gray-400 line-through">{product.price} ₽</span>
         
      </div>

      <h3 className="text-sm font-medium mb-1">{product.productName}</h3>
<div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
  <Rating
    value={product.rating ?? 3.5}
    precision={0.5}
    size="small"
    readOnly
  />

  <div className="flex items-center gap-1">
    <ChatBubbleOutlineIcon style={{ fontSize: 16 }} />
    <span>{product.reviewsCount ?? 23}</span>
  </div>
</div>

      {product.colors && product.colors.length > 0 && (
        <ColorFilter
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      )}
    </div>
  );
};

export default ProductCard;
