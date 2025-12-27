import React, { useState } from "react";
import { useCartStore } from "../../store/cart.store";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal";
import { Delete, Remove, Add, ShoppingCart, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { items, increase, decrease, remove, clear, totalCount, totalPrice } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-[60vh]">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
            <ShoppingCart sx={{ fontSize: 128 }} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Корзина пуста</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Добавьте товары из каталога, чтобы оформить заказ
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-[#3593ff] to-[#969aea] text-white font-medium rounded-xl hover:from-[#20f0ff] hover:to-[#FF7435] transition-all duration-200 shadow-lg"
          >
            Перейти к покупкам
          </button>
        </div>
      </div>
    );
  }

  const deliveryPrice = totalPrice() > 2999 ? 0 : 299;
  const totalWithDelivery = totalPrice() + deliveryPrice;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
       <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowBack sx={{ fontSize: 20 }} />
          Назад
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Корзина <span className="text-[#005BFF]">({totalCount()} товаров)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Товары в корзине</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="p-6 flex gap-6 hover:bg-gray-50/50 transition-colors">
                   <div className="relative">
                    <img
                      src={`https://store-api.softclub.tj/images/${item.image}`}
                      alt={item.productName}
                      className="w-28 h-28 object-cover rounded-xl border border-gray-200"
                    />
                    {item.hasDiscount && (
                      <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        -{Math.round((1 - item.discountPrice / item.price) * 100)}%
                      </div>
                    )}
                  </div>

                   <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                          {item.productName}
                        </h3>
                        
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mb-3">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                            <span className="text-sm text-gray-600">{item.selectedColor}</span>
                          </div>
                        )}

                        {/* Цена */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-gray-900">
                            {item.hasDiscount ? item.discountPrice.toLocaleString() : item.price.toLocaleString()} ₽
                          </span>
                          {item.hasDiscount && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.price.toLocaleString()} ₽
                            </span>
                          )}
                        </div>
                      </div>

                       <button
                        onClick={() => remove(item.id, item.selectedColor)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Delete />
                      </button>
                    </div>

                     <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => decrease(item.id, item.selectedColor)}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Remove />
                        </button>
                        
                        <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                        
                        <button
                          onClick={() => increase(item.id, item.selectedColor)}
                          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition-colors"
                        >
                          <Add />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Итого за товар:</p>
                        <p className="text-lg font-bold text-gray-900">
                          {(item.hasDiscount ? item.discountPrice : item.price) * item.quantity} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

         <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Ваш заказ</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Товары ({totalCount()} шт.)</span>
                <span className="font-medium">{totalPrice().toLocaleString()} ₽</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span className={deliveryPrice === 0 ? "text-green-600 font-medium" : "font-medium"}>
                  {deliveryPrice === 0 ? "Бесплатно" : `${deliveryPrice.toLocaleString()} ₽`}
                </span>
              </div>
              
              {deliveryPrice > 0 && (
                <p className="text-sm text-gray-500">
                  Бесплатная доставка от 2 999 ₽
                </p>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>К оплате</span>
                  <span className="text-2xl text-[#005BFF]">{totalWithDelivery.toLocaleString()} ₽</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-[#3593ff] to-[#969aea] text-white font-medium rounded-xl hover:from-[#20f0ff] hover:to-[#FF7435] transition-all duration-200 shadow-lg text-lg"
              >
                Оформить заказ
              </button>

              <button
                onClick={clear}
                className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Очистить корзину
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span className="text-green-600">✓</span>
                <span>Гарантия возврата 14 дней</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-green-600">✓</span>
                <span>Оплата при получении</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCheckoutOpen && (
        <CheckoutModal onClose={() => setIsCheckoutOpen(false)} />
      )}
    </div>
  );
};

export default Cart;