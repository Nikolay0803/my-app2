import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos } from "../../redux/todos/todoSlice";
import EdiTodo from "../EdiTodo";
import { Link } from "react-router-dom";
import { Roller } from "react-awesome-spinners";
import ButtonComponent from "../Button/ButtonComponent";
import "../ListTodo/ListTodo.css";

function TodoItem(props) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.todos);
  const todo = todos.find((todo) => todo.id === props.todo.id);

  const [editTodoId, setEditTodoId] = useState(null);

  const onDeleteHandler = async (id) => {
    // setLoading(true);
    await dispatch(deleteTodo(id));
    await dispatch(fetchTodos());
    // setLoading(false);
  };

  const getTodoForEdit = (id) => {
    setEditTodoId(id);
  };

  return (
    <li className="list">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => getTodoForEdit(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "",
        }}
      >
        <p>Назва: {todo.name}</p>
        <p>Опис: {todo.description}</p>
      </span>
      {editTodoId === todo.id ? (
        <EdiTodo todoId={editTodoId} />
      ) : (
        <Link className="button" to={`${todo.id}`}>
          {loading ? <Roller /> : "Редагувати"}
        </Link>
      )}
      <ButtonComponent text={"Видалити"} type={"button"} id={todo.id} />
    </li>
  );
}

export default TodoItem;
