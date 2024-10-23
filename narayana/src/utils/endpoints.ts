// utils/endpoints.ts

import axios from "axios";
import { TodoItem } from "@/app/(finance-goals)/_interfaces/TodoItem";

const BASE_URL = "http://localhost:8000/api";

export const fetchTodos = async (): Promise<TodoItem[]> => {
  const response = await axios.get(`${BASE_URL}/get_financegoal/`);
  return response.data.data.map((todo: any) => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
  }));
};

export const addTodo = async (newTodoItem: { text: string }): Promise<TodoItem> => {
  const response = await axios.post(`${BASE_URL}/add_financegoal/`, {
    ...newTodoItem,
    completed: false,
  });
  return { ...newTodoItem, id: response.data.data.id, completed: false };
};

export const removeTodo = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/delete_financegoal/${id}/`);
};

export const toggleComplete = async (id: string, completed: boolean): Promise<TodoItem> => {
  const response = await axios.put(`${BASE_URL}/toggle_complete/${id}/`, { completed });
  return response.data.data;
};