import { useEffect, useState } from 'react';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { AddPost } from './AddPost';
import { PostCard } from './PostCard';

export function Home() {
  const [posts, setPosts] = useState([]);

  const getPostsList = async () => {
    await axios
      .get('http://localhost:3001/api/posts')
      .then((res) => setPosts(res.data));
  };

  useEffect(() => {
    getPostsList();
  }, []);

  const addPost = async (post) => {
    await axios
      .post('http://localhost:3001/api/posts', { ...post })
      .then(setPosts(posts));
    getPostsList();
  };

  const deletePost = async (id) => {
    await axios.delete('http://localhost:3001/api/posts/' + id);
    getPostsList();
  };

  const [searchTerm, setSearchTerm] = useState('');

  const [pageNumber, setPageNumber] = useState(0);

  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;
  const pageCount = Math.ceil(
    posts.filter((post) => {
      if (searchTerm === '') {
        return post;
      } else if (post.title.toLowerCase().includes(searchTerm)) {
        return post;
      }
      return false;
    }).length / postsPerPage
  );

  function changePage({ selected }) {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="container home">
      <h4 className="center">Home</h4>
      <input
        type="search"
        placeholder="Search for post"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          changePage({ selected: 0 });
        }}
      />
      <PostCard
        getPostsList={getPostsList}
        posts={posts}
        deletePost={deletePost}
        searchTerm={searchTerm}
        pagesVisited={pagesVisited}
        postsPerPage={postsPerPage}
      />
      <AddPost addPost={addPost} />
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
