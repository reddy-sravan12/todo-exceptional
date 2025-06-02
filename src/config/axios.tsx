import store from "@/store/store";
import { resetUser } from "@/store/userSlice";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => response,

  (error: any) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Jwt expired Please try to login again"
    ) {
      localStorage.removeItem("token");
      store.dispatch(resetUser());
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
