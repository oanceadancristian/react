import { useState } from 'react';

export function AddTodo({ addTodo }) {
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addTodo({ id: Math.random(), content: content });
    setContent('');
  }

  function handleChange(e) {
    setContent(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add new todo</label>
        <input type="text" value={content} onChange={handleChange} />
      </form>
    </div>
  );
}
