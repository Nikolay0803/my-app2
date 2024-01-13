import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h3>Привіт, хочу привітати вас в додатку Todo🙋‍♂️</h3>
      <Link to='/todo'>Start</Link>
      <p>За допомогою даного додатка можна: додавати цілі, опис до них, редагувати їх та позначати виконнання</p>
      <p>Приємного викоростання!!!😉</p>
    </>
  )
}

export default Home