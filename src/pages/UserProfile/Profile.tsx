import React from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <h2 className="text-xl font-bold mb-4">Профиль</h2>
      <p>Добро пожаловать, {user.name}!</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition mt-4"
      >
        Выйти
      </button>
    </div>
  );
};

export default Profile;