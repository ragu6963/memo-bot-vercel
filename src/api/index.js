import axios from "axios";
import { store } from "../store";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const axiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
