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
import { useAuthStore } from "../..//store/auth.store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
const { isLoggedIn } = useAuthStore();
const [showLoginModal, setShowLoginModal] = useState(false);

  const discountPercentage = product.price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;
const handleAddToCart = (e: React.MouseEvent) => {
  e.stopPropagation();

  if (!isLoggedIn) {
    setShowLoginModal(true);  
    return;
  }

  addToCart(product);
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
    {showLoginModal && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200"
    onClick={() => setShowLoginModal(false)}
  >
    <div 
      className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-2xl transform transition-all duration-200 scale-100"
      onClick={(e) => e.stopPropagation()}
    >
       <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Требуется вход
        </h3>
        <button
          onClick={() => setShowLoginModal(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрыть"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Иконка */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
      
       <p className="text-sm text-gray-600 mb-6 text-center">
        Чтобы добавить товар в корзину и оформить заказ,
        пожалуйста, войдите в свой аккаунт.
      </p>
      
       <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          После входа вы сможете:
        </p>
        <ul className="text-xs text-blue-600 mt-1 space-y-1">
          <li className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Сохранять товары в корзине
          </li>
          <li className="flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Отслеживать заказы
          </li>
        </ul>
      </div>
      
       <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            navigate("/login");
            setShowLoginModal(false);
          }}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Войти
        </button>
        
        <button
          onClick={() => setShowLoginModal(false)}
          className="flex-1 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          Отмена
        </button>
      </div>
      
       <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Нет аккаунта?{' '}
          <button
            onClick={() => {
              navigate("/register");
              setShowLoginModal(false);
            }}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductCard;