import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/auth";

// Register user function
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

// Login user function
export const loginUser = async (loginData) => {
  try {
    // Send login request to backend
    const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Login Response:", response.data);

    // Extract access_token, refresh_token, and username from the response
    const { access_token, refresh_token, username } = response.data;

    // Check that all expected data is present and in correct format
    if (
      typeof access_token === "string" &&
      typeof refresh_token === "string" &&
      typeof username === "string"
    ) {
      // Store tokens and username in localStorage for later use
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("username", username);

      // Return an object with success and the stored values
      return {
        success: true,
        access_token,
        refresh_token,
        username,
      };
    } else {
      // If any of the values are not in the expected format, throw an error
      throw new Error("Invalid token format or missing fields");
    }
  } catch (error) {
    // Handle errors during login and display meaningful messages
    console.error("Login Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Function to logout user (clear localStorage)
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
};

// Function to check if the user is logged in by verifying the token
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token; // Return true if token exists, false if not
};

// Function to get the current user's username (if logged in)
export const getCurrentUsername = () => {
  const username = localStorage.getItem("username");
  return username || null; // Return username or null if not logged in
};

// Example of how to use the token to make an authenticated request
export const makeAuthenticatedRequest = async (url, method = "GET", data = null) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("User is not authenticated.");
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Authenticated Request Error:", error.response?.data || error.message);
    throw error.response?.data || "Request failed";
  }
};

