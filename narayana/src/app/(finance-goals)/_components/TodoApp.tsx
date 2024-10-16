"use client";

import React, { useState } from "react";
import { TodoItem } from "../_interfaces/TodoItem";
import TodoTask from "./TodoTask";
import { Button } from "@/components/ui/button";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder=" Set Your Goal"
      />
      <Button onClick={addTodo} className="ml-2">
        Add Todo
      </Button>
      <ul>
        {todos.map((todo) => (
          <TodoTask
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
