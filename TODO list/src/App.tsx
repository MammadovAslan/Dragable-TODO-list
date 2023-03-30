import { useState } from "react";
import AddTodoForm from "./Components/AddTodoForm";
import TodoContainer from "./Components/TodoContainer";
import { TodoI } from "./types/types";

const App = () => {
  const [todos, setTodos] = useState<TodoI[]>([]);

  return (
    <div className="wrapper">
      <div className="container">
        <AddTodoForm setTodos={setTodos} todos={todos} />
        <TodoContainer setTodos={setTodos} todos={todos} />
      </div>
    </div>
  );
};

export default App;
