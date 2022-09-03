import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export function EditTodo() {
  const navigate = useNavigate();

  const { todo_id } = useParams();

  const [todo, setTodo] = useState({
    title: '',
    completed: '',
  });

  const todoTitle = todo.title;
  const todoTitleCapitalized =
    todoTitle.charAt(0).toUpperCase() + todoTitle.slice(1);

  const getTodoDetails = async () => {
    await axios
      .get('http://localhost:3001/api/toDoList/' + todo_id)
      .then((res) => setTodo(res.data));
  };

  useEffect(() => {
    getTodoDetails();
  }, []);

  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch('http://localhost:3001/api/toDoList/' + todo_id, {
      ...todo,
    });
    navigate('/');
  };

  return (
    <>
      <h1 className="center">Edit todo</h1>
      <form onSubmit={handleSubmit} className={'edit-form'}>
        <input
          type="text"
          name="title"
          value={todoTitleCapitalized}
          placeholder="Edit todo title"
          className="edit-input"
          required
          onChange={handleChange}
        />
        <button className="white-text edit-button">Edit</button>
      </form>
    </>
  );
}
