import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-oq9d.onrender.com/api",
});

// ✅ Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;