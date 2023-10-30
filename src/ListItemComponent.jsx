import React from 'react'


function ListItemComponent(props) {

  
  return (
    <li>
       {props.todo.name}
      <button onClick={props.onDelete}>Delete</button>
    </li>
    
  );
}

export default ListItemComponent