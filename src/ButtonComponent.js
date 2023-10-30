import React from 'react'

function ButtonComponent(props) {
  return (
    <button type={props.type} onClick={props.onClick}>{props.text}</button>
  )
}

export default ButtonComponent