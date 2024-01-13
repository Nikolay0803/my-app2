// EdiTodo.js

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { useParams, Link } from "react-router-dom";
import { editTodo, deleteTodo, fetchTodoById } from "..//redux/todos/todoSlice";
import "./ListTodo/ListTodo.css";

const EdiTodo = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { data: todo } = useQuery(["todo", id], () =>
    dispatch(fetchTodoById(id))
  );

  const [editTodoData, setEditTodoData] = useState({
    name: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    console.log("Todo:", todo);
    if (todo) {
      setEditTodoData({
        name: todo.payload.name,
        description: todo.payload.description,
        completed: todo.payload.completed,
      });
    }
  }, [todo]);

  const onEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setEditTodoData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const onSaveEdit = async () => {
    try {
      await dispatch(editTodo({ id, data: editTodoData }));
      queryClient.invalidateQueries("todos");
    } catch (error) {
      console.log("Error updating Todo", error);
      throw error;
    }
  };

  const onDeleteHandler = async () => {
    try {
      await dispatch(deleteTodo(id));
      queryClient.invalidateQueries("todos");
    } catch (error) {
      console.log("Error deleting Todo", error);
    }
  };

  return (
    <>
      <div>
        <h3>Редагувати Todo</h3>
        <label className="label">
          Назва:
          <input
            className="input"
            type="text"
            name="name"
            value={editTodoData.name}
            onChange={onEditInputChange}
          />
        </label>
        <label className="label">
          Опис:
          <input
            className="input"
            type="text"
            name="description"
            value={editTodoData.description}
            onChange={onEditInputChange}
          />
        </label>
        <label>
          Виконано:
          <input
            type="checkbox"
            name="completed"
            checked={editTodoData.completed}
            onChange={onEditInputChange}
          />
        </label>
        <Link className="button" onClick={onSaveEdit} to="/todo">
          Зберегти
        </Link>
        <Link className="button" onClick={onDeleteHandler} to="/todo">
          Видалити
        </Link>
      </div>
    </>
  );
};

export default EdiTodo;
