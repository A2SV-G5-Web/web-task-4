import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { MdPadding } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
