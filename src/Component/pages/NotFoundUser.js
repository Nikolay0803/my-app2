import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundUser = () => {
  return (
    <>
    <h3>Користувач не знайден <Link to='/reg'>Зареєструватись</Link></h3>
    </>
  )
}

export default NotFoundUser