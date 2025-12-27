import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Person,
  Phone,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  HowToReg,
  ArrowBack,
  CheckCircle,
  Error
} from "@mui/icons-material";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Введите имя пользователя";
    } else if (formData.userName.length < 3) {
      newErrors.userName = "Имя должно быть не менее 3 символов";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Введите номер телефона";
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Введите корректный номер телефона";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Подтвердите пароль";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");

    try {
      const { data } = await axios.post(
        "http://37.27.29.18:8002/Account/register",
        formData
      );
      
      setSuccess(data.data || "Регистрация успешна!");
      
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Ошибка регистрации. Проверьте данные.";
      setErrors({ server: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-25 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
              <HowToReg sx={{ fontSize: 32, color: "white" }} />
            </div>
            <h1 className="text-2xl font-bold text-white">H-Tech Market</h1>
            <p className="text-white/90 mt-2">Создайте новый аккаунт</p>
          </div>

           <div className="p-8 space-y-5">
            {/* Имя пользователя */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя пользователя
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Person />
                </div>
                <input
                  value={formData.userName}
                  onChange={(e) => handleInputChange("userName", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Придумайте имя пользователя"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.userName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#005BFF] focus:border-transparent"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.userName && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <Error sx={{ fontSize: 16 }} />
                  {errors.userName}
                </p>
              )}
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone />
                </div>
                <input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="+992 987654321"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.phoneNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#005BFF] focus:border-transparent"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <Error sx={{ fontSize: 16 }} />
                  {errors.phoneNumber}
                </p>
              )}
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Email />
                </div>
                <input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="example@mail.com"
                  type="email"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#005BFF] focus:border-transparent"
                  }`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <Error sx={{ fontSize: 16 }} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Пароль */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock />
                </div>
                <input
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showPassword ? "text" : "password"}
                  placeholder="Не менее 6 символов"
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#005BFF] focus:border-transparent"
                  }`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <Error sx={{ fontSize: 16 }} />
                  {errors.password}
                </p>
              )}
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Подтверждение пароля
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock />
                </div>
                <input
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  onKeyPress={handleKeyPress}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Повторите пароль"
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#005BFF] focus:border-transparent"
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <Error sx={{ fontSize: 16 }} />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

             {errors.server && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center flex items-center justify-center gap-2">
                  <Error />
                  {errors.server}
                </p>
              </div>
            )}

             {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle />
                  {success}
                </p>
              </div>
            )}

             <button
              onClick={handleRegister}
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
                  Регистрация...
                </>
              ) : (
                <>
                  <HowToReg />
                  Зарегистрироваться
                </>
              )}
            </button>

             <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="text-[#005BFF] font-medium hover:underline">
                  Войти
                </Link>
              </p>
            </div>

             
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Register;