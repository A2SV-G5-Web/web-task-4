import ToDo from "../types/todo";

const LOCAL_STORAGE_KEY = "todo-app-todos";

const TodoService = {
  // GET Todos
  getTodos(): ToDo[] {
    const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  },

  // ADD Todo
  addTodo: (text: string) => {
    const todos = TodoService.getTodos();
    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const newTodo = {
      id: maxId + 1,
      text,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
    return newTodo
  },

  // UPDATE Todo
  updateTodo: (updatedTodo: ToDo) => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  },

  // DELETE Todo
    deleteTodo: (id: number) => {
        const todos = TodoService.getTodos();
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    },

};

export default TodoService;
