import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo, completeTodo, inCompleteTodo } from "../service/TodoService";
import TodoForm from "../Components/TodoForm";
import TodoList from "../Components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = async (todo) => {
    try {
      await addTodo(todo);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdate = async (id, updatedTodo) => {
    try {
      await updateTodo(id, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleComplete = async (id, completed) => {
    try {
      completed ? await inCompleteTodo(id) : await completeTodo(id);
      fetchTodos();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">List of Todo Tasks</h2>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} onComplete={handleComplete} />
    </div>
  );
};

export default TodoPage;
