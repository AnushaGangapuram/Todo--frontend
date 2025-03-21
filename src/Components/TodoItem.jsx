import React, { useState } from "react";

const TodoItem = ({ todo, onUpdate, onDelete, onComplete }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSave = () => {
    onUpdate(todo.id, { ...todo, title, description });
    setEditMode(false);
  };

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {editMode ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <span>{todo.completed ? <del>{todo.title}</del> : todo.title}</span>
        )}
      </td>
      <td>
        {editMode ? (
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        ) : (
          <span>{todo.completed ? <del>{todo.description}</del> : todo.description}</span>
        )}
      </td>
      <td>
        <input type="checkbox" checked={todo.completed} onChange={() => onComplete(todo.id, todo.completed)} />
      </td>
      <td>
        {editMode ? (
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="btn btn-info btn-sm" onClick={() => setEditMode(true)}>
            Update
          </button>
        )}
        <button className="btn btn-danger btn-sm ms-2" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
