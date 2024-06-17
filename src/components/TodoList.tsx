import React, { useState } from "react";
import ToDo from "../types/todo";
import TodoService from "../services/TodoService";
import TodoForm from "./TodoForm";
import { FaEdit, FaCheck, FaSave } from "react-icons/fa";
import { MdCancel, MdDelete, MdRemoveDone } from "react-icons/md";
import "../styles/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number, completed: boolean) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = { id, text: editedTodoText, completed: completed };
      TodoService.updateTodo(updateTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDelete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToDoDone = (id: number, text: string, completed: boolean) => {
    const updateTodo = { id, text: text, completed: true };

    if (completed) {
      updateTodo.completed = false;
    }
    TodoService.updateTodo(updateTodo);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
    );
  };

  return (
    <div className="todo-container">
      {/* form goes here */}
      <TodoForm setTodos={setTodos}></TodoForm>

      <div className="todo-list">
        {todos.map((todo) => (
          <div
            className={`todo-item ${todo.completed ? "completed" : ""}`}
            key={todo.id}
          >
            {editingTodoId === todo.id ? (
              <div className={`edited-text ${todo.completed ? "" : ""}`}>
                <input
                  type="text"
                  className="edit-form-field"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus={true}
                />

                <div className="edit-btns">
                  <button
                    className="save-btn"
                    onClick={() => handleEditSave(todo.id, todo.completed)}
                  >
                    <FaSave />
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleEditCancel()}
                  >
                    <MdCancel />
                  </button>
                </div>
              </div>
            ) : (
              <div className="todo-text">
                <span>{todo.text}</span>
              </div>
            )}
            <div
              className={`ctrl-btns ${todo.completed ? "done-ctrl-btns" : ""}`}
            >
              <button
                className={` ${todo.completed ? "undo-btn" : "done-btn"}`}
                onClick={() =>
                  handleToDoDone(todo.id, todo.text, todo.completed)
                }
              >
                {todo.completed ? <MdRemoveDone /> : <FaCheck />}
              </button>
              <button
                className="edit-btn"
                onClick={() => handleEditStart(todo.id, todo.text)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
