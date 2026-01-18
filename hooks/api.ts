import axios from "axios";
import { showError } from "../utils/toast";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    showError(message);

    return Promise.reject(error);
  },
);

export default api;
