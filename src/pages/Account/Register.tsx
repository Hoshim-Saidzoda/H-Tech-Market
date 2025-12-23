import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!userName || 
        !phoneNumber || 
        !email || 
        !password ||
         !confirmPassword) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://37.27.29.18:8002/Account/register",
        { userName, phoneNumber, email, password, confirmPassword }
      );
      alert(data.data); 
      navigate("/login"); 
    } catch (error) {
      alert("Ошибка регистрации. Проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Создайте аккаунт H-Tech Market
        </h1>
        <p className="text-center text-gray-500">
          Регистрация даст доступ к эксклюзивным скидкам и бонусам
        </p>

        <div className="space-y-4">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Имя пользователя"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Телефон"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Подтвердите пароль"
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition transform"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <p className="text-center text-gray-500 text-sm">
          Уже есть аккаунт?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Войдите
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
