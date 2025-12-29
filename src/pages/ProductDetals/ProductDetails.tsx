import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/product.api";
import { useCartStore } from "../../store/cart.store";
import { useWishlistStore } from "../../store/wishlist.store";
import { useColors } from "../../useColors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareIcon from "@mui/icons-material/Share";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import Rating from "@mui/material/Rating";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useNavigate } from "react-router-dom";
import ColorFilter from "../../components/ColorFilter/ColorFilter";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedColorImages, setSelectedColorImages] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const { colors, isLoading: isColorsLoading } = useColors();

  const { data: product, isLoading: isProductLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!product) return;
    
    const firstColor = product.colors?.[0];
    setSelectedColor(firstColor?.colorName || null);
    
    if (firstColor && product.images) {
      const imagesForColor = product.images.filter(img => img.colorId === firstColor.id);
      setSelectedColorImages(imagesForColor);
      setCurrentImage(imagesForColor[0]?.images || product.images[0]?.images || null);
    } else {
      setCurrentImage(product.images?.[0]?.images || null);
      setSelectedColorImages(product.images || []);
    }
  }, [product]);

  const getThumbnails = () => {
    if (!product?.images) return Array(6).fill(currentImage);
    
    const realImages = product.images.map(img => img.images).filter(Boolean);
    
    if (realImages.length >= 6) {
      return realImages.slice(0, 6);
    }
    
    const result = [...realImages];
    while (result.length < 6) {
      result.push(realImages[realImages.length - 1] || currentImage);
    }
    
    return result;
  };

  const thumbnails = getThumbnails();

  const discountPercentage = product?.price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ 
      ...product, 
      selectedColor, 
      image: currentImage,
      quantity 
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist({...product, image: currentImage});
  };

  if (isProductLoading || isColorsLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-500">Загрузка...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b mt-20 border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg 
                       text-gray-700 hover:text-gray-900 hover:bg-gray-50 
                       active:bg-gray-100 transition-all duration-200
                       border border-gray-200 hover:border-gray-300"
            >
              <ArrowBackIcon 
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" 
              />
              <span className="font-medium text-sm hidden sm:block">Назад</span>
            </button>
            
            <div className="flex items-center gap-2">
              {!isMobile && (
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              )}
              <span className="text-xs sm:text-sm text-gray-500">Онлайн</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          {isMobile && (
            <div className="mb-6">
              <div className="relative bg-white border border-gray-200 rounded-xl mb-4">
                {discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-[#FF6B35] text-white px-2 py-1 rounded-lg text-xs font-bold">
                      -{discountPercentage}%
                    </div>
                  </div>
                )}
                
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                  <button
                    onClick={handleToggleWishlist}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      transition-all duration-200
                      ${isInWishlist(product.id) 
                        ? 'bg-red-50 text-red-500 border border-red-200' 
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                      }
                      hover:shadow-sm
                    `}
                  >
                    {isInWishlist(product.id) ? (
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                    )}
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:shadow-sm">
                    <ShareIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
                
                <img
                  src={`https://store-api.softclub.tj/images/${currentImage}`}
                  alt={product.productName}
                  className="w-full h-[300px] object-contain p-4"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {thumbnails.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(img)}
                    className={`
                      w-16 h-16 flex-shrink-0 border-2 rounded-lg overflow-hidden
                      transition-all duration-200
                      ${currentImage === img 
                        ? 'border-[#005BFF] ring-2 ring-blue-100' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <img
                      src={`https://store-api.softclub.tj/images/${img}`}
                      alt={`${product.productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {!isMobile && (
              <div className="lg:col-span-1">
                <div className="flex flex-col gap-2">
                  {thumbnails.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(img)}
                      className={`
                        w-20 aspect-square border-2 rounded-lg overflow-hidden
                        transition-all duration-200
                        ${currentImage === img 
                          ? 'border-[#005BFF] ring-2 ring-blue-100' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <img
                        src={`https://store-api.softclub.tj/images/${img}`}
                        alt={`${product.productName} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isMobile && (
              <div className="lg:col-span-5">
                <div className="relative bg-white border border-gray-200 rounded-xl p-4">
                  {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-[#FF6B35] text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md">
                        -{discountPercentage}%
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <button
                      onClick={handleToggleWishlist}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-200
                        ${isInWishlist(product.id) 
                          ? 'bg-red-50 text-red-500 border border-red-200' 
                          : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
                        }
                        hover:shadow-sm
                      `}
                    >
                      {isInWishlist(product.id) ? (
                        <FavoriteIcon sx={{ fontSize: 20 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                      )}
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:shadow-sm">
                      <ShareIcon sx={{ fontSize: 20 }} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:shadow-sm">
                      <CompareArrowsIcon sx={{ fontSize: 20 }} />
                    </button>
                   </div>

                  <div className="relative">
                    <img
                      src={`https://store-api.softclub.tj/images/${currentImage}`}
                      alt={product.productName}
                      className="w-full h-[400px] sm:h-[500px] object-contain"
                    />
                    <button className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <ZoomInIcon sx={{ fontSize: 20, color: '#666' }} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className={`${isMobile ? '' : 'lg:col-span-6'}`}>
              <div className="mb-4">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">{product.category}</div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center">
                    <Rating
                      value={product.rating ?? 4.5}
                      precision={0.1}
                      readOnly
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFB800',
                        },
                      }}
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1 sm:ml-2">
                      {product.rating?.toFixed(1) ?? '4.5'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <ChatBubbleOutlineIcon sx={{ fontSize: isMobile ? 14 : 16 }} />
                    <span>{product.reviewsCount ?? 23} отзывов</span>
                  </div>
                </div>
              </div>

              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4">
                {product.productName}
              </h1>

              <div className="mb-4 sm:mb-6">
                {selectedColor && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg mb-3">
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-gray-600 truncate">Выбранный цвет</div>
                      <div className="text-sm font-medium text-gray-900 truncate">{selectedColor}</div>
                    </div>
                  </div>
                )}
                
                {colors.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm sm:text-base mb-2">Выберите цвет:</h3>
                    <ColorFilter
                      colors={colors}
                      selectedColor={selectedColor}
                      onSelectColor={(colorName) => setSelectedColor(colorName)}
                      isMobile={isMobile}
                    />
                  </div>
                )}
              </div>

              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <LocalShippingOutlinedIcon sx={{ fontSize: isMobile ? 18 : 20, color: '#005BFF' }} />
                  <span className="font-medium text-gray-900 text-sm sm:text-base">Доставка</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircleOutlineIcon sx={{ fontSize: isMobile ? 14 : 16, color: '#00B23E' }} />
                    <span>Бесплатно при заказе от 2999 ₽</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <span className="text-[#00B23E] font-medium">Доставим завтра</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {product.discountPrice.toLocaleString()} ₽
                  </span>
                  {product.price && product.price > product.discountPrice && (
                    <>
                      <span className="text-base sm:text-lg text-gray-500 line-through">
                        {product.price.toLocaleString()} ₽
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#FF6B35] bg-orange-50 px-2 py-1 rounded">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                <div className="text-xs sm:text-sm text-[#005BFF] font-medium">
                  С картой — {(product.discountPrice * 0.97).toLocaleString()} ₽
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-3`}>
                  <div className={`flex items-center border border-gray-300 rounded-lg ${isMobile ? 'w-full justify-between' : ''}`}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className={`${isMobile ? 'flex-1' : 'px-4'} py-2 min-w-[60px] text-center font-medium`}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`
                      ${isMobile ? 'w-full' : 'flex-1'}
                      bg-gradient-to-r from-[#3593ff] to-[#969aea]
                      hover:from-[#20f0ff] hover:to-[#FF7435]
                      text-white font-medium text-sm
                      py-2.5 sm:py-3 rounded-lg
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      shadow-sm hover:shadow
                      active:scale-[0.98]
                    `}
                  >
                    <ShoppingCartOutlinedIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
                    <span>Добавить в корзину</span>
                  </button>
                </div>
              </div>

              {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {product.discountPrice.toLocaleString()} ₽
                      </div>
                      {product.price > product.discountPrice && (
                        <div className="text-xs text-gray-500 line-through">
                          {product.price.toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 max-w-[200px] ml-4 bg-gradient-to-r from-[#3593ff] to-[#969aea] text-white py-2.5 rounded-lg font-medium text-sm"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Описание</h2>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {isMobile && <div className="h-16"></div>}
    </div>
  );
};

export default ProductDetails;