import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (erro) => {
    return Promise.reject(erro);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
