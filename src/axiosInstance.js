// src/utils/axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Replace with your actual base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // or from context/cookies/etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("status code is = ", error.status);
    if (error.status === 401) {
      const refres_token = localStorage.getItem("refresh_token", null);
      // call function to update access_token in local storage
      update_token(refres_token);
      console.log("refres token is = ", refres_token);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

function update_token(refres_token) {
  const payload = {
    refresh: refres_token,
  };
  axios
    .post("http://127.0.0.1:8000/account/token/refresh/", payload)
    .then((response) => {
      localStorage.setItem("access_token", response["data"]["access"]);
    })
    .catch((error) => {
      console.log("catch of refresh token = ", error.status);
      if (error.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    })
    .finally(() => {
      // console.log("refresh token finally block = ");
    });
}

export default axiosInstance;
