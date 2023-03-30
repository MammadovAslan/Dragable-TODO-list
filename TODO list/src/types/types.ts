export interface TodoI {
  id: string;
  title: string;
  description: string;
  position: number;
  nestedTodos: TodoI[];
  isDone: boolean;
  todos?: TodoI[];
  setTodos?: React.Dispatch<React.SetStateAction<TodoI[]>>;
}

export interface FormProps {
  todos: TodoI[];
  setTodos: React.Dispatch<React.SetStateAction<TodoI[]>>;
}

export interface TodoContainerProps extends FormProps {}
