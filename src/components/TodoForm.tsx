import React, { useState, Dispatch, SetStateAction } from "react";
import TodoService from "../services/TodoService";
import ToDo from "../types/todo";
import { MdAdd } from "react-icons/md";
import '../styles/TodoForm.css'

interface TodoFormProps {
  setTodos: Dispatch<SetStateAction<ToDo[]>>;
}

const TodoForm: React.FC<TodoFormProps> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTodoText.trim() !== "") {
      const newTodo: ToDo = TodoService.addTodo(newTodoText);
      setTodos((prevTodo: ToDo[]) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <form className="form-group" onSubmit={handleAddTodo}>
      <input
        type="text"
        className="form-field"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a task"
      />
        <button type="submit">
          <MdAdd />
        </button>

    </form>
  );
};

export default TodoForm;
