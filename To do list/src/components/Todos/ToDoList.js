import { useEffect, useState } from 'react';
import { TodoCard } from '../Todos/TodoCard';
import { AddTodo } from '../Todos/AddTodo';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

export function ToDoList() {
  const [todos, setTodos] = useState([]);

  const getToDoList = async () => {
    await axios
      .get('http://localhost:3001/api/toDoList')
      .then((res) => setTodos(res.data));
  };

  useEffect(() => {
    getToDoList();
  }, []);

  const addTodo = async (todo) => {
    await axios
      .post('http://localhost:3001/api/toDoList', { ...todo })
      .then(setTodos(todos));
    getToDoList();
  };

  const deleteTodo = async (id) => {
    await axios.delete('http://localhost:3001/api/toDoList/' + id);
    getToDoList();
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [pageNumber, setPageNumber] = useState(0);

  const todosPerPage = 10;
  const pagesVisited = pageNumber * todosPerPage;
  const pageCount = Math.ceil(
    todos?.filter((todo) => {
      if (searchTerm === '') {
        return todo;
      } else if (
        todo.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) {
        return todo;
      }
      return false;
    }).length / todosPerPage
  );

  function changePage({ selected }) {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="todo-app container">
      <h1 className="center">Todos</h1>
      <AddTodo addTodo={addTodo} />
      <input
        type="search"
        placeholder="Search for todo"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          changePage({ selected: 0 });
        }}
      />
      <TodoCard
        getToDoList={getToDoList}
        todos={todos}
        deleteTodo={deleteTodo}
        searchTerm={searchTerm}
        pagesVisited={pagesVisited}
        todosPerPage={todosPerPage}
      />
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBttns'}
        previousLinkClassName={'previousBttn'}
        nextLinkClassName={'nextBttn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </div>
  );
}
