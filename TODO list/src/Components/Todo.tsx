import { useState, useRef } from "react";
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
  const [titleClicked, setTitleClicked] = useState(false);
  const [titleValue, setTitleValue] = useState(title);

  const inputRef = useRef<HTMLInputElement>(null);

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

  const clickHandler = () => {
    setTitleClicked(true);
    inputRef?.current?.focus();
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value)

    if (setTodos && todos) {
      const index = todos.findIndex((todo) => todo.id === id);
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], title: e.target.value };
      setTodos(newTodos);
    }
    setTitleClicked(false)
  };

  const style = {
    opacity: titleClicked ? "1" : "0",
    width: titleClicked ? "auto" : "0",
  };

  return (
    <>
      <div className="todo-header">
        {!titleClicked && (
          <h2 className="todo-title" onClick={clickHandler}>
            {title}
          </h2>
        )}
        <input
          type="text"
          className="title-input"
          style={style}
          ref={inputRef}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={changeTitle}
        />

        <div className="buttons">
          <input type="checkbox" id="done" checked={done} onChange={changeHandler} />
          <label htmlFor="done"></label>
          <button className="delete-todo" onClick={removeTodo}>
            X
          </button>
        </div>
      </div>
      <p className="todo-description">{description}</p>
      <button className="add-todo-button">Add to-do</button>
    </>
  );
};

export default Todo;
