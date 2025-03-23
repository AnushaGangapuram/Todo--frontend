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
    });

    console.log("Login Response:", response.data);

    // Ensure token is correctly extracted
    let token = response.data.token;

    if (typeof token === "string") {
      localStorage.setItem("token", token); // Store JWT token
      return token;
    } else {
      throw new Error("Invalid token format");
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
