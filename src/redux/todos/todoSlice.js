import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://localhost:8000/todos");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todoData) => {
  const response = await axios.post("http://localhost:8000/todos", todoData);
  return response.data;
});
export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById",
  async (id) => {
    const response = await axios.get(`http://localhost:8000/todos/${id}`);
     console.log(response.data); 
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`http://localhost:8000/todos/${id}`);
  return id;
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, data }) => {
    const response = await axios.put(`http://localhost:8000/todos/${id}`, data);
    return response.data;
  }
);

export const clearTodos = createAsyncThunk("todos/clearTodos", async () => {
  const response = await axios.get("http://localhost:8000/todos");
  const todos = response.data;


  await Promise.all(
    todos.map(async (todo) => {
      await axios.delete(`http://localhost:8000/todos/${todo.id}`);
    })
  );
  return true;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(clearTodos.fulfilled, (state) => {
        state.todos = [];
      })
         .addCase(fetchTodoById.fulfilled, (state, action) => {
       
        state.loading = false;
        state.todos = [action.payload];
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const editedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === editedTodo.id
        );
        if (index !== -1) {
          state.todos[index] = editedTodo;
        }
      });
  },
});

export default todosSlice.reducer;
