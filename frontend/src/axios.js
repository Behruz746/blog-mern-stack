import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444/",
});

// each request to check whether the user is logged in or not
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
