import React from "react";
import { useCartStore } from "../../store/cart.store";

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

  

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">
        Корзина ({totalCount()} товаров)
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 bg-white p-4 rounded shadow"
          >
            <img
        src={`http://37.27.29.18:8002/images/${item.image}`}
 
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.productName}</h3>
              <p className="text-red-500 font-bold">
                { item.price} ₽
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decrease(item.id)}
                  className="px-2 border rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increase(item.id)}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => remove(item.id)}
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
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
