import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <p>Not Found Pages</p>
      <Link to='/'>Повернутись на головну сторінку</Link>
    </div>
  ) 
}

export default NotFound