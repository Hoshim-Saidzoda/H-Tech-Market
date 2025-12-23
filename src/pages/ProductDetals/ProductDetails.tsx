import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/product.api";
import { useCartStore } from "../../store/cart.store";
import { useWishlistStore } from "../../store/wishlist.store";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ColorFilter from "../../components/ColorFilter/ColorFilter";

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: !!productId,
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error || !product) return <div>Продукт не найден</div>;

  const images = product.images || [];
  const currentImage = images[currentImageIndex]?.images;

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart({ ...product, selectedColor });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{product.productName}</h1>

      <div className="relative">
        {currentImage ? (
          <img
            src={`http://37.27.29.18:8002/images/${currentImage}`}
            alt={product.productName}
            className="w-full h-96 object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
            Изображение недоступно
          </div>
        )}

        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 bg-white rounded-full shadow hover:bg-red-100 transition-colors p-2"
        >
          {isInWishlist(product.id) ? (
            <FavoriteIcon className="text-red-500" />
          ) : (
            <FavoriteBorderIcon className="text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <img
              key={img.id}
              src={`http://37.27.29.18:8002/images/${img.images}`}
              alt={`${product.productName} ${index + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                index === currentImageIndex ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Выберите цвет:</h3>
          <ColorFilter
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            colors={product.colors}  
          />
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <p className="text-xl text-red-500 font-bold">{product.discountPrice} ₽</p>
        {product.price && <p className="text-gray-400 line-through">{product.price} ₽</p>}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!selectedColor}
        className="mt-4 w-70 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductDetails;
