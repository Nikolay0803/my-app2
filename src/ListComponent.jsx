import React from "react";
import { useState } from "react";
import ListItemComponent from "./ListItemComponent";

export const ListComponent = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(["One"]);

  const onClickHandler = () => {
    const updatedElement = [...item, input];
    setItem(updatedElement);
    setInput("");
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
      <p>{item.length}</p>
      <ul>
        {item.map((element, index) => (
          <ListItemComponent key={index} element={element} />
        ))}
      </ul>
      <button onClick={() => onClickHandler(input)}>Add TODo</button>
    </>
  );
};
