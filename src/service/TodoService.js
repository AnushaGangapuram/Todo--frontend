import axios from "axios";

const TODO_API_BASE_URL = "http://localhost:8081/apis/Todo";

// Function to get the authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Axios instance with base configuration
const api = axios.create({
  baseURL: TODO_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Axios request interceptor to include the token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Calls
export const getTodos = () => api.get("/getAll");
export const addTodo = (todo) => api.post("/add", todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/${id}`);
export const completeTodo = (id) => api.patch(`/${id}/complete`);
export const inCompleteTodo = (id) => api.patch(`/${id}/incomplete`);

// Debugging: Check if token is present
console.log("Token in localStorage:", localStorage.getItem("token"));
