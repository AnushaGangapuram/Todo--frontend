import axios from "axios";

const TODO_API_BASE_URL = "http://localhost:8081/apis/Todo";

export const getTodos = () => axios.get(`${TODO_API_BASE_URL}/getAll`);
export const addTodo = (todo) => axios.post(`${TODO_API_BASE_URL}/add`, todo);
export const updateTodo = (id, todo) => axios.put(`${TODO_API_BASE_URL}/${id}`, todo);
export const deleteTodo = (id) => axios.delete(`${TODO_API_BASE_URL}/${id}`);
export const completeTodo = (id) => axios.patch(`${TODO_API_BASE_URL}/${id}/complete`);
export const inCompleteTodo = (id) => axios.patch(`${TODO_API_BASE_URL}/${id}/incomplete`);
