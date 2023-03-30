import { useState } from "react";
import { TodoI } from "../types/types";

const Todo = ({
  description,
  id,
  isDone,
  position,
  title,
  nestedTodos,
  todos,
  setTodos,
}: TodoI) => {
  const [done, setDone] = useState<boolean>(isDone);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDone(e.target.checked);

    if (setTodos && todos) {
      const index = todos.findIndex((todo) => todo.id === id);
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], isDone: e.target.checked };
      setTodos(newTodos);
    }
  };

  const removeTodo = () => {
    setTodos && setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="typography">
        <h2 className="todo-title">{title}</h2>
        <p className="todo-description">{description}</p>
      </div>
      <div className="buttons">
        <input type="checkbox" id="done" checked={done} onChange={changeHandler} />
        <label htmlFor="done"></label>
        <button className="delete-todo" onClick={removeTodo}>
          X
        </button>
      </div>
    </>
  );
};

export default Todo;
