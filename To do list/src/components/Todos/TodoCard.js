import { Link } from 'react-router-dom';

import axios from 'axios';

export function TodoCard({
  getToDoList,
  todos,
  deleteTodo,
  searchTerm,
  pagesVisited,
  todosPerPage,
}) {
  const toDoList = todos?.length ? (
    todos
      .filter((todo) => {
        if (searchTerm === '') {
          return todo;
        } else if (
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return todo;
        }
        return false;
      })
      .slice(pagesVisited, pagesVisited + todosPerPage)
      .map((todo) => {
        const todoTitle = todo.title;
        const todoTitleCapitalized =
          todoTitle.charAt(0).toUpperCase() + todoTitle.slice(1);

        function handleChange() {
          const updateTodo = async () => {
            await axios.patch('http://localhost:3001/api/toDoList/' + todo.id, {
              completed: !todo.completed,
            });
            getToDoList();
          };
          updateTodo();
        }

        return (
          <div className="collection-item" key={todo.id}>
            <label>
              <input
                name="completed"
                id="indeterminate-checkbox"
                type="checkbox"
                value={todo.title}
                checked={todo.completed}
                onChange={handleChange}
              />
              <span className={todo.completed ? 'crossed' : 'not-crossed'}>
                {todoTitleCapitalized}
              </span>
            </label>
            <div className="buttons">
              <Link to={'/todos/edit/' + todo.id}>
                <button className="edit">Edit</button>
              </Link>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })
  ) : (
    <p className="center">You have no todos left</p>
  );

  return <div className="todos collection">{toDoList}</div>;
}
