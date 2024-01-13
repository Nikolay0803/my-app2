import axios from "axios";
import React, { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import "../ListTodo/ListTodo.css";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [minLength, setMinLength] = useState(5);
  const [maxLength, setMaxLength] = useState(10); // Adjust the max length as needed
  const [validationError, setValidationError] = useState(""); // Add state for validation error

  const navigate = useNavigate();

  const createNewUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:8000/auth", newUser);
      // Assuming you have a queryClient defined somewhere
      // queryClient.invalidateQueries("auth");
    } catch (error) {
      console.log("Помилка при додаванні Користувача", error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (login.trim() === "") {
      setValidationError("Мінімальна кількість символів: " + minLength);
      return;
    }

    if (password.length < minLength) {
      setValidationError(
        "Мінімальна кількість символів для паролю: " + minLength
      );
      return;
    }

    if (password.length > maxLength) {
      setValidationError(
        "Максимальна кількість символів для паролю: " + maxLength
      );
      return;
    }

    const newUser = {
      login: login,
      password: password,
    };

    createNewUser(newUser);
    setLogin("");
    setPassword("");
    setValidationError("");
    navigate("/login")
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

        {validationError && <p style={{ color: "red" }}>{validationError}</p>}

        <button className="loginButton" type="submit">
          Зареєструватись
        </button>
      </form>
    </div>
  );
};

export default Registration;
