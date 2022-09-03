import { useState } from 'react';

export function AddPost({ addPost }) {
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    addPost(post);
    setPost({ title: '', body: '' });
  }

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Type post title"
          required
          value={post.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Type post body"
          required
          value={post.body}
          onChange={handleChange}
        ></textarea>
        <button className="add">Add post</button>
      </form>
    </>
  );
}
