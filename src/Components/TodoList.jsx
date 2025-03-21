import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onUpdate, onDelete, onComplete }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Todo ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} onComplete={onComplete} />
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
