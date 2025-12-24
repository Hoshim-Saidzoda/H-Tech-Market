import React from "react";
import { useCartStore } from "../../store/cart.store";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const {
    items,
    increase,
    decrease,
    remove,
    clear,
    totalCount,
    totalPrice,
  } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
        <p className="text-gray-500">Добавьте товары, чтобы оформить заказ</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">
        Корзина ({totalCount()} товаров)
      </h1>

      <div className="space-y-4">
        {items.map(item => (
          <div
            key={`${item.id}-${item.selectedColor}`}
            className="flex gap-4 bg-white p-4 rounded shadow"
          >
            <img
              src={`http://37.27.29.18:8002/images/${item.image}`}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.productName}</h3>

              {item.selectedColor && (
                <p className="text-sm text-gray-500">
                  Цвет: {item.selectedColor}
                </p>
              )}

              <p className="text-red-500 font-bold mt-1">
                {item.hasDiscount ? item.discountPrice : item.price} ₽
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decrease(item.id, item.selectedColor)}
                  className="px-2 border rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increase(item.id, item.selectedColor)}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => remove(item.id, item.selectedColor)}
              className="text-red-500 text-sm"
            >
              Удалить
            </button>
          </div>    
        ))}
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow flex justify-between items-center">
        <div>
          <p className="text-gray-500">Итого</p>
          <p className="text-xl font-bold">{totalPrice()} ₽</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={clear}
            className="border px-4 py-2 rounded"
          >
            Очистить
          </button>
          <button  onClick={() => navigate(`/Login`)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
