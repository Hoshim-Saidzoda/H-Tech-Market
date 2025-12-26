import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useWishlistStore } from "../../store/wishlist.store";
import { useCartStore } from "../../store/cart.store";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product });
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md border border-gray-200 hover:border-orange-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       <div className="relative aspect-square bg-white p-4">
        <div 
          className="relative h-full w-full cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={`https://store-api.softclub.tj/images/${product.image}`}
            alt={product.productName}
            className="w-full h-full  transition-transform duration-300 group-hover:scale-110"
          />
        </div>

       

         <button
          onClick={(e) => {
            e.stopPropagation();
            isInWishlist(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product);
          }}
          className="absolute top-2 right-2 z-10"
        >
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200
            ${isInWishlist(product.id) 
              ? 'bg-red-50 text-red-500 border border-red-200' 
              : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
            }
            hover:shadow-sm
          `}>
            {isInWishlist(product.id) ? (
              <FavoriteIcon sx={{ fontSize: 18 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18 }} />
            )}
          </div>
        </button>
      </div>

       <div className="p-3 pt-0">
         <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {product.discountPrice.toLocaleString()} ₽
            </span>
               <>
                <span className="text-sm text-gray-500 line-through">
                  {product.price.toLocaleString()} ₽
                </span>
                <span className="text-xs font-medium text-[#FF6B35] bg-orange-50 px-1.5 py-0.5 rounded">
                  -{discountPercentage}%
                </span>
              </>
           </div>
          
           <div className="text-xs text-[#005BFF] font-medium mt-1">
            С Ozon Картой — {(product.discountPrice * 0.97).toLocaleString()} ₽
          </div>
        </div>

         <div className="flex items-center gap-1.5 mb-2">
          <LocalShippingOutlinedIcon sx={{ fontSize: 14, color: '#005BFF' }} />
          <span className="text-xs text-gray-600">
            Бесплатно при заказе от 2999 ₽
          </span>
        </div>

         <h3 
          className="text-sm text-gray-900 mb-2 leading-tight line-clamp-2 cursor-pointer hover:text-[#005BFF] transition-colors duration-200 min-h-[40px]"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.productName}
        </h3>

         <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center bg-[#FFF9E5] px-1.5 py-0.5 rounded">
            <Rating
              value={product.rating ?? 4.5}
              precision={0.1}
              size="small"
              readOnly
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#FFB800',
                },
                '& .MuiRating-icon': {
                  padding: '1px',
                },
              }}
            />
            <span className="text-xs font-bold text-gray-900 ml-1">
              {product.rating?.toFixed(1) ?? '4.5'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <ChatBubbleOutlineIcon sx={{ fontSize: 12 }} />
            <span>{product.reviewsCount ?? 23} отзывов</span>
          </div>
        </div>

         {product.inStock && (
          <div className="flex items-center gap-1.5 mb-3">
            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#00B23E' }} />
            <span className="text-xs text-[#00B23E] font-medium">
              В наличии • 12 шт.
            </span>
          </div>
        )}

         <button
          onClick={handleAddToCart}
          className="
            w-full
            bg-gradient-to-r from-[#3593ff] to-[#969aea]
            hover:from-[#20f0ff] hover:to-[#FF7435]
            text-white font-medium text-sm
            py-2.5 rounded-lg
            flex items-center justify-center gap-2
            transition-all duration-200
            shadow-sm hover:shadow
            active:scale-[0.98]
          "
        >
          <ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />
          <span>В корзину</span>
        </button>

         <div className="flex items-center justify-between mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isInWishlist(product.id)
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
            className="text-xs text-gray-600 hover:text-[#FF6B35] transition-colors duration-200 flex items-center gap-1"
          >
            {isInWishlist(product.id) ? (
              <>
                <FavoriteIcon sx={{ fontSize: 14 }} />
                <span>В избранном</span>
              </>
            ) : (
              <>
                <FavoriteBorderIcon sx={{ fontSize: 14 }} />
                <span>В избранное</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-xs text-[#005BFF] hover:text-[#0047CC] transition-colors duration-200"
          >
            Подробнее
          </button>
        </div>

         {product.colors && product.colors.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-2">Цвет</div>
            <div className="flex flex-wrap gap-2">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2 py-1 border border-gray-200 rounded hover:border-[#005BFF] transition-colors duration-200 cursor-pointer"
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hexCode || '#ccc' }}
                  />
                  <span className="text-xs text-gray-700">{color.colorName}</span>
                </div>
              ))}
              {product.colors.length > 3 && (
                <div className="text-xs text-gray-500 flex items-center px-2">
                  +{product.colors.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

         <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-[#00B23E]">●</span>
              <span>Доставка завтра</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;