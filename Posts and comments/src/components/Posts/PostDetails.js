import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import { AddComment } from './AddComment';
import { CommentCard } from './CommentCard';

export function PostDetails() {
  const navigate = useNavigate();

  const { post_id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/posts/' + post_id)
      .then((res) => setPost(res.data));
  }, [post_id]);

  const deletePost = async (id) => {
    await axios.delete('http://localhost:3001/api/posts/' + id);
    navigate('/');
  };

  const postTitle = post?.title;
  const postTitleCapitalized =
    postTitle?.charAt(0).toUpperCase() + postTitle?.slice(1);

  const postBody = post?.body;
  const postBodyCapitalized =
    postBody?.charAt(0).toUpperCase() + postBody?.slice(1);

  const postContent = post ? (
    <div className="post">
      <h4 className="center">{postTitleCapitalized}</h4>
      <p>{postBodyCapitalized}</p>
      <div className="buttons">
        <Link to={'/posts/edit/' + post.id}>
          <button className="edit">Edit post</button>
        </Link>
        <button className="delete" onClick={() => deletePost(post.id)}>
          Delete post
        </button>
      </div>
    </div>
  ) : (
    <div className="center">Loading post...</div>
  );

  const [comments, setComments] = useState([]);

  const getCommentsList = async () => {
    await axios
      .get('http://localhost:3001/api/comments?postId=' + post_id)
      .then((res) => setComments(res.data));
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  const addComment = async (comment) => {
    await axios
      .post('http://localhost:3001/api/comments', { ...comment })
      .then(setComments(comment));
    getCommentsList();
  };

  const deleteComment = async (id) => {
    await axios.delete('http://localhost:3001/api/comments/' + id);
    getCommentsList();
  };

  const [pageNumber, setPageNumber] = useState(0);

  const commentsPerPage = 10;
  const pagesVisited = pageNumber * commentsPerPage;
  const pageCount = Math.ceil(comments.length / commentsPerPage);

  function changePage({ selected }) {
    setPageNumber(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <div className="container">{postContent}</div>
      <h4 className="center">Comments</h4>
      <div className="container">
        <CommentCard
          comments={comments}
          deleteComment={deleteComment}
          pagesVisited={pagesVisited}
          commentsPerPage={commentsPerPage}
        />
        <AddComment addComment={addComment} />
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
    </>
  );
}
