"use client";

import React, { useState, useEffect } from "react";
import { TodoItem } from "../_interfaces/TodoItem";
import TodoTask from "./TodoTask";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { nanoid } from "nanoid";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get_financegoal/"
      );
      const fetchedTodos: TodoItem[] = response.data.data.map((todo: any) => ({
        id: todo.id || nanoid(), // Use backend ID or generate a unique one if missing
        text: todo.text,
        completed: todo.completed,
      }));
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: nanoid(), // Generate a unique ID for the new todo
      text: newTodo, // Ensure 'text' matches what the backend expects
      completed: false, // Ensure 'completed' matches what the backend expects
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/add_financegoal/",
        newTodoItem
      );
      setTodos([...todos, { ...newTodoItem, id: response.data.data.id }]); // Use ID from response if needed
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete_financegoal/${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      // Call the new API to toggle the completed status
      await axios.put(
        `http://localhost:8000/api/toggle_complete/${id}/`,
        updatedTodo
      );
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
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
      <Button onClick={addTodo} className="ml-2">
        Add Goal
      </Button>
      <ul>
        {todos.map((todo) => {
          const uniqueKey = nanoid();
          console.log("Todo ID:", todo.id); // Check if each ID is unique
          return (
            <TodoTask
              key={uniqueKey} // Assign a unique key here
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
