"use client";

import React, { useState, useEffect } from "react";
import { TodoItem } from "../_interfaces/TodoItem";
import TodoTask from "./TodoTask";
import { Button } from "@/components/ui/button";
// import { nanoid } from "nanoid";
import {
  fetchTodos,
  addTodo,
  removeTodo,
  toggleComplete,
} from "@/utils/endpoints";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;

    try {
      const newTodoItem = await addTodo({ text: newTodo });
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleRemoveTodo = async (id: string) => {
    try {
      await removeTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    try {
      const updatedTodo = await toggleComplete(id, !todo.completed);
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder=" Set Your Goal"
      />
      <Button onClick={handleAddTodo} className="ml-2">
        Add Goal
      </Button>
      <ul>
        {todos.map((todo) => (
          <TodoTask
            key={todo.id} // Use the actual ID for the key
            todo={todo}
            toggleComplete={handleToggleComplete}
            removeTodo={handleRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
