import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { login } from "../../api/account.api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
     if (!username || !password) {
      alert("Введите логин и пароль");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request to API");
      const data = await login({ userName: username, password });
      console.log("API response:", data);
 
       const userData = { name: username, token: data.data };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

       navigate("/");
    } catch (error) {
       alert("Ошибка входа. Проверьте логин и пароль.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
      
       <h1 className="text-3xl font-extrabold text-center text-gray-900">
        H-Tech Market
      </h1>
      <p className="text-center text-gray-500">
        Войдите и получайте эксклюзивные скидки, бонусы и новые предложения!
      </p>

       <div className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ваш логин или email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          type="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

       <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition transform"
      >
        {loading ? "Входим..." : "Войти"}
      </button>

       <p className="text-center text-gray-500 text-sm">
        Еще не с нами?{" "}
        <span
          className="text-blue-600 font-medium cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Зарегистрируйтесь и получите бонус!
        </span>
      </p>

    </div>
  </div>
);

};

export default Login;
