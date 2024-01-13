import React, { useState, useEffect } from "react";

const localStorage = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    const lsTodos = localStorage.getItem("todos");
    if (lsTodos) {
      setTodos(JSON.parse(lsTodos));
    }

    console.log("componentDidMount");

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    console.log("componentDidUpdate");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    setTodos((prevTodos) => [...prevTodos, input]);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <input
        onChange={handleInputChange}
        value={input}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <h3>Timer: {timer}</h3>
      <ul>
        {todos.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyFunctionalComponent;
