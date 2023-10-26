import React from 'react'
import GrandChildComponent from './GrandChildComponent'

function TodosComponent(props) {
  return (
    <>
    <div>{props.renderTodo}</div>
      {/* <GrandChildComponent newPropTodo={props.renderTodo} /> */}
    </>
  )
}

export default TodosComponent