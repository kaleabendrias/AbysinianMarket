import axios from "axios";
import { useAuthStore } from "../../store/authStore"; // Import your auth store

// Create an Axios instance
const api = axios.create({
  baseURL: "https://abysinianmarket.onrender.com", // Replace with your API base URL
});

// Request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState(); // Get the token from the auth store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.error || "";

      // Check for token expiration or invalid token messages
      if (
        errorMessage.includes("Token expired") ||
        errorMessage.includes("Invalid token")
      ) {
        const { logout } = useAuthStore.getState(); // Get the logout function from the auth store
        logout(); // Call logout to clear the token and authentication state

        // Optionally, redirect the user to the login page
        window.location.href = "/signin"; // Replace with your login route
      }
    }
    return Promise.reject(error);
  }
);

export default api;