import axios from "axios";

const TODO_API_BASE_URL = "http://localhost:8081/apis/Todo";

// Function to create an axios instance with the latest token
const createTodoAxios = () => {
    const token = localStorage.getItem("access_token");  // Change this from 'token' to 'access_token'
  
    console.log("Token found in localStorage:", token);
  
    if (!token) {
      console.error("No token found! API call aborted.");
      return null;  // Prevent API calls if no token exists
    }
  
    return axios.create({
      baseURL: TODO_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

// API Calls
export const getTodos = async () => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.get("/getAll");
};

export const addTodo = async (todo) => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.post("/add", todo);
};

export const updateTodo = async (id, todo) => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.put(`/${id}`, todo);
};

export const deleteTodo = async (id) => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.delete(`/${id}`);
};

export const completeTodo = async (id) => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.patch(`/${id}/complete`);
};

export const inCompleteTodo = async (id) => {
  const axiosInstance = createTodoAxios();
  if (!axiosInstance) return Promise.reject("No token found");
  return axiosInstance.patch(`/${id}/incomplete`);
};
