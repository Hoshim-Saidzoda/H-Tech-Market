import axios from "axios";

const API = axios.create({
  baseURL: "http://37.27.29.18:8002", 
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default API;
