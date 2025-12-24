import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/product.api";
import { useCartStore } from "../../store/cart.store";
import { useWishlistStore } from "../../store/wishlist.store";
import ColorFilter from "../../components/ColorFilter/ColorFilter";
import { useColors } from "../../useColors";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const { colors, isLoading: isColorsLoading } = useColors();

  const { data: product, isLoading: isProductLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

  useEffect(() => {
  if (!product) return;

  setCurrentImage(product.images?.[0]?.images || null);
  setSelectedColor(product.colors?.[0]?.colorName || null);
}, [product]);


  if (isProductLoading || isColorsLoading) return <div>Загрузка...</div>;
  if (error || !product) return <div>Продукт не найден</div>;

  const handleAddToCart = () => {
     addToCart({ ...product, selectedColor,image: currentImage  });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist({...product,image: currentImage});
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{product.productName}</h1>

      <div className="relative">
        {currentImage ? (
          <img
            src={`https://store-api.softclub.tj/images/${currentImage}`}
            alt={product.productName}
            className="w-full h-96 object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
            Изображение недоступно
          </div>
        )}

        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
        >
          {isInWishlist(product.id) ? "❤️" : "🤍"}
        </button>
        
        
        
              </div>

      {colors.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Выберите цвет:</h3>
          <ColorFilter
            colors={colors}
            selectedColor={selectedColor}
            onSelectColor={colorName => {
              setSelectedColor(colorName);
              const selectedColorObj = colors.find(c => c.colorName === colorName);
              if (!selectedColorObj) return;
              const imgForColor = product.images?.find(image => image.colorId === selectedColorObj.id);
              if (imgForColor) setCurrentImage(imgForColor.images);
              else setCurrentImage(product.images?.[0]?.images || null);
            }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <p className="text-xl text-red-500 font-bold">{product.discountPrice} ₽</p>
        {product.price && <p className="text-gray-400 line-through">{product.price} ₽</p>}
      </div>

      <button
        onClick={handleAddToCart}
         className="mt-4 w-70 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductDetails;
