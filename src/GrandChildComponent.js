import React from "react";

function GrandChildComponent(props) {
  console.log(props)
  return <div>{props.myNameinArray[0]}</div>;
}

export default GrandChildComponent;
