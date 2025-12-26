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
  const navigate = useNavigate();

  const { colors, isLoading: isColorsLoading } = useColors();

  const { data: product, isLoading: isProductLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

   const duplicateImages = Array(6).fill(currentImage);

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
       <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
  <div className="max-w-6xl mx-auto mt-20 px-4">
    <div className="flex items-center justify-between py-4">
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center gap-3 px-4 py-2.5 rounded-xl 
                 text-gray-700 hover:text-gray-900 hover:bg-gray-50 
                 active:bg-gray-100 transition-all duration-200
                 border border-gray-200 hover:border-gray-300"
      >
        <ArrowBackIcon 
          className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" 
        />
        <span className="font-medium">Вернуться назад</span>
      </button>
      
       <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        <span className="text-sm text-gray-500">Онлайн</span>
      </div>
    </div>
  </div>
</div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-1">
              <div className="flex flex-col gap-2">
                {duplicateImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(img)}
                    className={`
                      w-20 aspect-square border-2 rounded-lg overflow-hidden
                      transition-all duration-200
                      ${currentImage ==img 
                        ? 'border-[#005BFF]' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                       <img
                        src={`https://store-api.softclub.tj/images/${img}`}
                        alt={`${product.productName} ${index + 1}`}
                        className="w-full h-[full] object-cover"
                      />
                       
                  </button>
                ))}
              </div>
            </div>

             <div className="lg:col-span-5">
              <div className="relative bg-white border border-gray-200 rounded-xl p-4">
                   <div className="relative">
                    <img
                      src={`https://store-api.softclub.tj/images/${currentImage}`}
                      alt={product.productName}
                      className="w-full h-[500px] object-contain"
                    />
                     <button className="absolute bottom-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <ZoomInIcon sx={{ fontSize: 20, color: '#666' }} />
                    </button>
                  </div>
                    
                
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
              </div>
            </div>

             <div className="lg:col-span-6">
               <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <Rating
                      value={product.rating ?? 4.5}
                      precision={0.1}
                      readOnly
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFB800',
                        },
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {product.rating?.toFixed(1) ?? '4.5'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                    <span>{product.reviewsCount ?? 23} отзывов</span>
                  </div>
                </div>
              </div>

               <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {product.productName}
              </h1>

               
<div className="mb-6">
  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
    <div
      className="w-6 h-6 rounded-full border border-gray-300"
      style={{ backgroundColor: selectedColor   }}
    />
    <div>
      <div className="text-sm text-gray-600">Выбранный цвет</div>
       
    </div>
  </div>
  
  {colors.length > 0 && (
    <div className="mt-4">  
      <h3 className="font-medium mb-2">Выберите цвет:</h3>
      <ColorFilter
        colors={colors}
        selectedColor={selectedColor}
        onSelectColor={colorName => {
          setSelectedColor(colorName)
        }}
      />
    </div>
  )}
</div>
 
               <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: '#005BFF' }} />
                  <span className="font-medium text-gray-900">Доставка</span>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#00B23E' }} />
                    <span>Бесплатно при заказе от 2999 ₽</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <span className="text-[#00B23E] font-medium">Доставим завтра</span>
                  </div>
                </div>
              </div>

               <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.discountPrice.toLocaleString()} ₽
                  </span>
                  {product.price && product.price > product.discountPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        {product.price.toLocaleString()} ₽
                      </span>
                      <span className="text-sm font-medium text-[#FF6B35] bg-orange-50 px-2 py-1 rounded">
                        -{discountPercentage}%
                      </span>
                    </>
                  )}
                </div>
                <div className="text-sm text-[#005BFF] font-medium">
                  С картой — {(product.discountPrice * 0.97).toLocaleString()} ₽
                </div>
              </div>

               <div className="mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
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
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                    <span>Добавить в корзину</span>
                  </button>
                </div>
              </div>

              
            </div>
          </div>

           <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Описание</h2>
            <div className="text-gray-700 leading-relaxed">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;