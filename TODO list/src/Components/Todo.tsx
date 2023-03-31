import { useState, useRef } from "react";
import { TodoI, TodoProps } from "../types/types";
import AddTodoForm from "./AddTodoForm";

const Todo = ({ id, isDone, position, title, nestedTodos, todos, setTodos }: TodoProps) => {
  const [done, setDone] = useState<boolean>(isDone);
  const [titleClicked, setTitleClicked] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [showForm, setShowForm] = useState(false);

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
    setTitleValue(e.target.value);

    if (setTodos && todos) {
      const index = todos.findIndex((todo) => todo.id === id);
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], title: e.target.value };
      setTodos(newTodos);
    }
    setTitleClicked(false);
  };

  const inputStyles = {
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
          style={inputStyles}
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
      {nestedTodos.length !== 0 && (
        <ul className="nested-todo-container">
          {nestedTodos.map((todo: TodoI) => (
            <li className="todo" key={todo.id}>
              <Todo
                id={todo.id}
                isDone={todo.isDone}
                nestedTodos={todo.nestedTodos}
                position={todo.position}
                title={todo.title}
                todos={todos}
                setTodos={setTodos}
              />
            </li>
          ))}
        </ul>
      )}

      {showForm ? (
        <AddTodoForm
          setTodos={setTodos}
          todos={todos}
          isNestedForm={true}
          setShowForm={setShowForm}
          nestedTodoId={id}
        />
      ) : (
        <button
          className="add-todo-button"
          onClick={() => {
            setShowForm(true);
          }}
        >
          Add to-do
        </button>
      )}
    </>
  );
};

export default Todo;
