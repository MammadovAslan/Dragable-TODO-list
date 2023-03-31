import { useState, useEffect } from "react";
import { TodoContainerProps, TodoI } from "../types/types";
import Todo from "./Todo";
const TodoContainer = ({ setTodos, todos }: TodoContainerProps) => {
  const [hasTodo, setHasTodo] = useState(false);
  useEffect(() => {
    setHasTodo(todos.length !== 0);
  }, [todos]);

  console.log(todos);

  const [currentTodo, setCurrentTodo] = useState<TodoI>();

  const dragStart = (e: React.DragEvent<HTMLLIElement>, todo: TodoI) => {
    setCurrentTodo(todo);
  };
  const dragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };
  const dragLeave = (e: React.DragEvent<HTMLLIElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const dragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "lightgray";
  };
  const dragDrop = (e: React.DragEvent<HTMLLIElement>, todo: TodoI) => {
    e.preventDefault();

    if (currentTodo) {
      setTodos(
        todos.map((t) => {
          if (t.id === todo.id) {
            return { ...t, position: currentTodo.position };
          } else if (t.id === currentTodo.id) {
            return { ...t, position: todo.position };
          } else {
            return t;
          }
        })
      );
    }
  };

  return (
    <div className="todos-container">
      <ul className="todos-list">
        {hasTodo &&
          todos
            .sort((a, b) => a.position - b.position)
            .map((todo: TodoI) => (
              <li
                className="todo"
                draggable={true}
                key={todo.id}
                onDragStart={(e) => {
                  dragStart(e, todo);
                }}
                onDragEnd={(e) => {
                  dragEnd(e);
                }}
                onDragLeave={(e) => {
                  dragLeave(e);
                }}
                onDrop={(e) => {
                  dragDrop(e, todo);
                }}
                onDragOver={(e) => {
                  dragOver(e);
                }}
              >
                <Todo
                  description={todo.description}
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
    </div>
  );
};

export default TodoContainer;
