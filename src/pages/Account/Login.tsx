import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { login } from "../../api/account.api";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { 
  Lock, 
  Person, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon,
  ArrowBack
} from "@mui/icons-material";

const Login: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { login: authLogin } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Введите логин и пароль");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await login({ userName: username, password });
      
      const userData = { 
        name: username, 
        token: data.data,
        role: data.role || "user"
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.data);
      localStorage.setItem("username", username);

      authLogin();
      
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 500);

    } catch (error: any) {
      console.error("Login error:", error);
      setError(
        error.response?.status === 401 
          ? "Неверный логин или пароль" 
          : "Ошибка сервера. Попробуйте позже."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-25 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Кнопка назад */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowBack />
          Назад
        </button>

         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
           <div className="bg-gradient-to-r from-[#3593ff] to-[#969aea] p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <Lock sx={{ fontSize: 32, color: "white" }} />
            </div>
            <h1 className="text-2xl font-bold text-white">H-Tech Market</h1>
            <p className="text-white/90 mt-2">Войдите в свой аккаунт</p>
          </div>

           <div className="p-8 space-y-6">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин  
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Person />
                </div>
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите ваш логин  "
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005BFF] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock />
                </div>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите ваш пароль"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005BFF] focus:border-transparent transition"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>

             {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

             <button
              onClick={handleLogin}
              disabled={loading}
              className={`
                w-full py-4 text-white font-semibold rounded-lg
                transition-all duration-300 flex items-center justify-center gap-2
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[#3593ff] to-[#969aea] hover:from-[#20f0ff] hover:to-[#FF7435] hover:shadow-lg"
                }
              `}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Входим...
                </>
              ) : (
                <>
                  <LoginIcon />
                  Войти
                </>
              )}
            </button>

            

             <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Нет аккаунта?</span>
              </div>
            </div>

             <Link to="/register">
              <button
                className="w-full py-3 border-2 border-[#005BFF] text-[#005BFF] font-semibold rounded-lg
                         hover:bg-[#005BFF] hover:text-white transition-all duration-300"
              >
                Создать аккаунт
              </button>
            </Link>

             
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Login;