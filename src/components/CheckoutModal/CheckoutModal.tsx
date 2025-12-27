import React, { useState } from "react";
import { useCartStore } from "../../store/cart.store";
import { sendOrderToTelegram } from "../../store/utils/sendToTelegram";

interface Props {
  onClose: () => void;
}

const CheckoutModal: React.FC<Props> = ({ onClose }) => {
  const { items, totalPrice, clear } = useCartStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone) return alert("Заполните все поля");

    setLoading(true);
    await sendOrderToTelegram(name, phone, items, totalPrice());
    setLoading(false);

    clear();
    onClose();
    alert("Заказ отправлен!");
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[90%] max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Оформление заказа</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          className="w-full border p-3 rounded mb-3"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Номер телефона"
          className="w-full border p-3 rounded mb-4"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border rounded p-3"
          >
            Отмена
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
