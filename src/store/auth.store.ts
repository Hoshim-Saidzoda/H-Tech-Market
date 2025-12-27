import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const loadAuth = () => {
  return !!localStorage.getItem("user"); 
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: loadAuth(),

  login: () => {
    set({ isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ isLoggedIn: false });
  },
}));
