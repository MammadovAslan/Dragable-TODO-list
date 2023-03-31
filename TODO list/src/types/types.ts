export interface TodoI {
  id: string;
  title: string;
  position: number;
  nestedTodos: TodoI[];
  isDone: boolean;
}

export interface TodoProps extends TodoI {
  todos: TodoI[];
  setTodos: React.Dispatch<React.SetStateAction<TodoI[]>>;
}

export interface FormProps {
  todos: TodoI[];
  setTodos: React.Dispatch<React.SetStateAction<TodoI[]>>;
  isNestedForm?: boolean;
  setShowForm?:React.Dispatch<React.SetStateAction<boolean>>
  nestedTodoId?:string
}

export interface TodoContainerProps extends FormProps {}
