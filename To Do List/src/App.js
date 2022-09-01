import { useState } from 'react';
import { Todos } from '../src/components/Todos/Todos';
import { AddTodo } from '../src/components/Todos/AddTodo';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: 'buy vegetables' },
    { id: 2, content: 'cook meals' },
    { id: 3, content: 'clean bedroom' },
  ]);

  function deleteTodo(id) {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  return (
    <div className="todo-app container">
      <h1 className="center blue-text">Todos</h1>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export { App };
