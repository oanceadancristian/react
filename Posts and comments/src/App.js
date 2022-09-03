import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../src/components/Posts/Navbar';
import { Home } from '../src/components/Posts/Home';
import { About } from '../src/components/Posts/About';
import { Contact } from '../src/components/Posts/Contact';
import { PostDetails } from '../src/components/Posts/PostDetails';
import { EditPost } from '../src/components/Posts/EditPost';
import { EditComment } from '../src/components/Posts/EditComment';
import { NotFound } from '../src/components/Posts/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/posts/:post_id" element={<PostDetails />} />
          <Route path="/posts/edit/:post_id" element={<EditPost />} />
          <Route path="/comments/edit/:comment_id" element={<EditComment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
