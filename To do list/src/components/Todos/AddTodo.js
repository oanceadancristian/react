import { useState } from 'react';

export function AddTodo({ addTodo }) {
  const [todo, setTodo] = useState({
    title: '',
    completed: false,
  });

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(todo);
    setTodo({ title: '' });
  }

  function handleChange(e) {
    setTodo({ title: e.target.value, completed: false });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add new todo"
          required
          value={todo.title}
          onChange={handleChange}
        />
        <button className="white-text add">Add</button>
      </form>
    </div>
  );
}
