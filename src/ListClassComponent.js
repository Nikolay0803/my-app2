import React, { Component } from "react";
import ListItemComponent from "./ListItemComponent";
import ButtonComponent from "./ButtonComponent";

class ListClassComponent extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      todos: [],
    };
  }

  componentDidMount() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  }

  componentWillUnmount() {
    this.saveToLocalStorage();
  }

  saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  onClickHandler = () => {
    if (this.state.input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      name: this.state.input,
    };

    this.setState(
      (prevState) => ({
        todos: [...prevState.todos, newTodo],
        input: "",
      }),
      () => {
        this.saveToLocalStorage();
      }
    );
  };

  onDeleteHandler = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState(
      {
        todos: updatedTodos,
      },
      () => {
        this.saveToLocalStorage();
      }
    );
  };

  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({ input: value });
  };

  onClearLocalStorage = () => {
    localStorage.removeItem("todos");
    this.setState({ todos: [] });
  };
  onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      this.onClickHandler();
    }
  };

  render() {
    return (
      <>
        <input
          onChange={this.onChangeHandler}
          value={this.state.input}
          onKeyPress={this.onKeyPressHandler}
        />
        <button onClick={this.onClickHandler}>Add Todo</button>
        <button onClick={this.onClearLocalStorage}>Clear Todo</button>
        <h2>
          <ul>
            {this.state.todos.map((todo) => (
              <ListItemComponent
                key={todo.id}
                todo={todo}
                onDelete={() => this.onDeleteHandler(todo.id)}
              >
                {<ButtonComponent text={"delete"} type={"button"} />}
              </ListItemComponent>
            ))}
          </ul>
        </h2>
      </>
    );
  }
}

export default ListClassComponent;
