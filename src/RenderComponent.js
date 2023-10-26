import React from "react";
import TodosComponent from "./TodosComponent";
import GrandChildComponent from "./GrandChildComponent";

function RenderComponent() {
  const toDos = [
    { id: 1, todo: "firstTodo" },
    { id: 2, todo: "secondTodo" },
    { id: 3, todo: "thirdTodo" },
    { id: 4, todo: "fourthTodo" },
  ];

  const myName = {
    name: "Nikolay",
  };

  const myNameinArray = ["Nikolay"];

  const myFunctionName = () => {
    return "Nikolay"
  }
  return (
    <div>
      {/* {toDos.map((todo) => {
        return (
          <TodosComponent key={todo.id} renderTodo={todo.todo}></TodosComponent>
        );
      })} */}
      <GrandChildComponent
        myName={myName}
        myNameinArray={myNameinArray}
        myFunctionName={myFunctionName}
      />
    </div>
  );
}
export default RenderComponent;
