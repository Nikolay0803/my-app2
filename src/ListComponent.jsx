import React from "react";
import { useState } from "react";
import ListItemComponent from "./ListItemComponent";
import ButtonComponent from "./ButtonComponent";

export const ListComponent = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, name: "One" },
    { id: 2, name: "Two" },
    { id: 3, name: "Three" },
  ]);

  const onClickHandler = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: todos.length + 1,
      name: input,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setInput("");
  };

  const onDeleteHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const onKeyPressHandler = (input) => {
    if (input.key === "Enter") {
      onClickHandler();
    }
  };
  return (
    <>
      <input
        onChange={onChangeHandler}
        value={input}
        onKeyPress={onKeyPressHandler}
      />
      <h2>{todos.length}</h2>
      <ul>
        {todos.map((todo) => (
          <ListItemComponent
            key={todo.id}
            todo={todo}
            onDelete={() => onDeleteHandler(todo.id)}
          >{<ButtonComponent text={"delete"} type={"button"} />}</ListItemComponent>
        ))}
      </ul> 
      <button onClick={() => onClickHandler(input)}>Add TODo</button>
    </>
  );
};
