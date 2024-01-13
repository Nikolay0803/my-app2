import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  clearTodos,
  deleteTodo,
  fetchTodos,
} from "../../redux/todos/todoSlice";
import { Ring } from "react-awesome-spinners";
import ListItemComponent from "../ListItem/ListItem";
import "./ListTodo.css";

const ListTodo = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.todos);

  const [input, setInput] = useState("");
  const [inputAbout, setInputAbout] = useState("");
  const [filter, setFilter] = useState("all");
  const [minLength, setMinLength] = useState(3);
  const [maxLength, setMaxLength] = useState(20);
  const [validationError, setValidationError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const createNewTodo = () => {
    if (input.trim() === "") {
      setValidationError("Мінімальна кількість символів: " + minLength);
      return;
    }

    if (input.length > maxLength) {
      setValidationError("Максимальна кількість символів: " + maxLength);
      return;
    }

    dispatch(
      addTodo({
        name: input,
        description: inputAbout,
        completed: false,
      })
    );

    setInput("");
    setInputAbout("");
    setValidationError("");
    setShowAddForm(false);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteTodo(id));
  };

  const onClearLocalStorage = () => {
    dispatch(clearTodos());
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Назва"
        onChange={(e) => {
          setInput(e.target.value);
          setValidationError("");
        }}
        value={input}
      />
      <span className="validation-error">{validationError}</span>
      <input
        className="input"
        placeholder="Опис"
        onChange={(e) => {
          setInputAbout(e.target.value);
          setValidationError("");
        }}
        value={inputAbout}
      />
      <span className="validation-error">{validationError}</span>
      <br />
      <button className="button" onClick={createNewTodo}>
        Додати Todo
      </button>
      <br />
      <button className="button" onClick={onClearLocalStorage}>
        Clear Todo
      </button>
      <select className="select" value={filter} onChange={handleFilterChange}>
        <option value="all">Всі</option>
        <option value="active">Не виконані</option>
        <option value="completed">Виконані</option>
      </select>
      <h1>{filteredTodos().length}</h1>
      <h2>
        {todos.length === 0 && !showAddForm && (
          <>
            <p>Наразі у вас немає завдань</p>
            <button className="button" onClick={() => setShowAddForm(true)}>
              Додати Todo
            </button>
          </>
        )}
        {showAddForm && (
          <div>
            <h3>Додати Todo</h3>
            <label className="addLabel">
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Назва"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <label className="addLabel">
              <input
                className="input"
                type="text"
                name="description"
                placeholder="Опис"
                value={inputAbout}
                onChange={(e) => setInputAbout(e.target.value)}
              />
            </label>
            <button className="button" onClick={createNewTodo}>
              Додати
            </button>
          </div>
        )}
        <ul>
          {loading ? (
            <Ring />
          ) : (
            filteredTodos().map((todo) => (
              <ListItemComponent
                key={todo.id}
                todo={todo}
                onDelete={() => onDeleteHandler(todo.id)}
              />
            ))
          )}
        </ul>
      </h2>
    </div>
  );
};

export default ListTodo;
