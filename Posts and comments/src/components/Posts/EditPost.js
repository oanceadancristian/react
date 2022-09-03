import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export function EditPost() {
  const navigate = useNavigate();

  const { post_id } = useParams();

  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  const postTitle = post.title;
  const postTitleCapitalized =
    postTitle.charAt(0).toUpperCase() + postTitle.slice(1);

  const postBody = post.body;
  const postBodyCapitalized =
    postBody.charAt(0).toUpperCase() + postBody.slice(1);

  const getPostDetails = async () => {
    await axios
      .get('http://localhost:3001/api/posts/' + post_id)
      .then((res) => setPost(res.data));
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handleEdit = async () => {
    await axios.patch('http://localhost:3001/api/posts/' + post_id, {
      ...post,
    });
    navigate('/');
  };

  const handleDelete = async () => {
    await axios.delete('http://localhost:3001/api/posts/' + post_id);
    navigate('/');
  };

  return (
    <>
      <h4 className="center">Edit post</h4>
      <div className="container box">
        <input
          type="text"
          name="title"
          value={postTitleCapitalized}
          placeholder="Edit post title"
          required
          onChange={handleChange}
        />
        <textarea
          name="body"
          value={postBodyCapitalized}
          placeholder="Edit post body"
          required
          onChange={handleChange}
        ></textarea>
        <div className="buttons-details">
          <button className="edit-details" onClick={handleEdit}>
            Edit post
          </button>
          <button className="delete-details" onClick={handleDelete}>
            Delete post
          </button>
        </div>
      </div>
    </>
  );
}
