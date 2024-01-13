import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ListTodo/ListTodo.css";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
 
 const navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Перевірка, чи існує введений логін у масиві auth
      const isLoginExists = await checkLoginExists(login);

      if (isLoginExists) {
        console.log(`Логін ${login} вже існує.`);
        setIsAuthenticated(true)
        return navigate("/todo")
      } else {
         setLogin("")
        setPassword("")
        return navigate("/notuser")
      }

      // Якщо логін не існує, виконуємо вхід

    } catch (error) {
      setLogin("")
      setPassword("")
      console.error("Не вдалося увійти:", error);
    }
  };

  // Функція для перевірки, чи існує введений логін у масиві auth
  const checkLoginExists = async (loginToCheck) => {
    try {
      const response = await axios.get("http://localhost:8000/auth");
      const authArray = response.data;

      // Перевірка, чи існує введений логін у масиві auth
      return authArray.some((item) => item.login === loginToCheck);
    } catch (error) {
      console.error("Помилка при перевірці логіну:", error);
      return false; // Повертаємо false в разі помилки
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <label className="loginLabel" htmlFor="login">
          Логін:
        </label>
        <input
          className="loginInput"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          name="login"
        />

        <label className="loginLabel" htmlFor="password">
          Пароль:
        </label>
        <input
          className="loginInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />

        <button className="loginButton" type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;
