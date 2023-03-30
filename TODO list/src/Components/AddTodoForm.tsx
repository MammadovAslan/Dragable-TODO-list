import { useState } from "react";
import { FormProps, TodoI } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const AddTodoForm = ({ setTodos, todos }: FormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHander = (e: React.FormEvent) => {
    e.preventDefault();

    const todo: TodoI = {
      id: uuidv4(),
      description,
      title,
      isDone: false,
      position: todos.length + 1,
      nestedTodos: [],
    };

    setTodos((prev) => [...prev, todo]);
  };

  return (
    <div className="form-container">
      <form className="add-todo-form" onSubmit={submitHander}>
        <input
          type="text"
          id="title"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="description"
          placeholder="Add description"
          cols={30}
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="submit-button">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
