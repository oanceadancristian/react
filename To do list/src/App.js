import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToDoList } from '../src/components/Todos/ToDoList';
import { EditTodo } from '../src/components/Todos/EditTodo';
import { NotFound } from '../src/components/Todos/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/todos/edit/:todo_id" element={<EditTodo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export { App };
