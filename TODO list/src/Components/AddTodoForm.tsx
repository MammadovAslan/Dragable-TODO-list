import { useState } from "react";
import { FormProps, TodoI } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const AddTodoForm = ({ setTodos, todos, isNestedForm, setShowForm, nestedTodoId }: FormProps) => {
  const [title, setTitle] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const todo: TodoI = {
      id: uuidv4(),
      title,
      isDone: false,
      position: todos.length + 1,
      nestedTodos: [],
    };

    if (isNestedForm && nestedTodoId && setShowForm) {
      const parentTodo = findParentTodoById(todos, nestedTodoId);
      if (parentTodo) {
        parentTodo.nestedTodos.push(todo);
        setTodos([...todos]);
        setShowForm(false);
      }
    } else {
      setTodos((prev) => [...prev, todo]);
    }

    setTitle("");
  };

  const findParentTodoById = (todos: TodoI[], id: string): TodoI | undefined => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        return todos[i];
      } else if (todos[i].nestedTodos.length > 0) {
        const parentTodo = findParentTodoById(todos[i].nestedTodos, id);
        if (parentTodo) {
          return parentTodo;
        }
      }
    }
    return undefined;
  };

  
  return (
    <div className="form-container">
      <form className="add-todo-form" onSubmit={submitHandler}>
        <input
          type="text"
          id="title"
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="submit-button">Add</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
