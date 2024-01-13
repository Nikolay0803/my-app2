// У ButtonComponent
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux/todos/todoSlice";

function ButtonComponent(props) {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(deleteTodo(props.id));
  };

  return (
    <button className="button" type={props.type} onClick={onDeleteHandler}>
      {props.text}
    </button>
  );
}

export default ButtonComponent;
