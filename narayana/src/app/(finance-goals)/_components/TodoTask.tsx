import React from "react";
import { TodoItem } from "../_interfaces/TodoItem";
import { Button } from "@/components/ui/button";

interface Props {
  todo: TodoItem;
  toggleComplete: (id: string) => void;
  removeTodo: (id: string) => void;
}

const TodoTask: React.FC<Props> = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <li className="flex pt-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        className="mt-1.5 ml-1"
      >
        {todo.text}
      </span>
      <Button onClick={() => removeTodo(todo.id)} className="ml-2">
        Remove
      </Button>
    </li>
  );
};

export default TodoTask;
