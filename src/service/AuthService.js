import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error.response?.data || "Registration failed";
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: false, // 🔍 Set to true only if using sessions
    });

    console.log(" Login Response:", response.data); 
    return response.data; // Ensure response is correctly returned
  } catch (error) {
    console.error(" Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
// todo task
