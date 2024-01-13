import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todos/todoSlice";

export const store = configureStore({
  reducer: { todos: todosReducer },
});
export default store;
