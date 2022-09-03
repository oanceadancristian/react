import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function AddComment({ addComment }) {
  const { post_id } = useParams();

  const [comment, setComment] = useState({
    postId: post_id,
    name: '',
    email: '',
    body: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    addComment(comment);
    setComment({ name: '', email: '', body: '' });
  }

  function handleChange(e) {
    setComment({
      ...comment,
      postId: post_id,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Type comment name"
          required
          value={comment.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Type comment email"
          required
          value={comment.email}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Type comment body"
          required
          value={comment.body}
          onChange={handleChange}
        ></textarea>
        <button className="add">Add comment</button>
      </form>
    </>
  );
}
