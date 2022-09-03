import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export function EditComment() {
  const navigate = useNavigate();

  const { comment_id } = useParams();

  const [comment, setComment] = useState({
    comment_id: comment_id,
    name: '',
    email: '',
    body: '',
  });

  const commentName = comment.name;
  const commentNameCapitalized =
    commentName.charAt(0).toUpperCase() + commentName.slice(1);

  const commentBody = comment.body;
  const commentBodyCapitalized =
    commentBody.charAt(0).toUpperCase() + commentBody.slice(1);

  const getCommentDetails = async () => {
    await axios
      .get(`http://localhost:3001/api/comments/${comment_id}`)
      .then((res) => setComment(res.data));
  };

  useEffect(() => {
    getCommentDetails();
  }, []);

  function handleChange(e) {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }

  const handleEdit = async () => {
    await axios.patch(`http://localhost:3001/api/comments/${comment_id}`, {
      ...comment,
    });
    navigate(-1);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/api/comments/${comment_id}`);
    navigate(-1);
  };

  return (
    <>
      <h4 className="center">Edit comment</h4>
      <div className="container box">
        <input
          type="text"
          name="name"
          value={commentNameCapitalized}
          placeholder="Edit comment name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={comment.email}
          placeholder="Edit comment email"
          required
          onChange={handleChange}
        />
        <textarea
          name="body"
          value={commentBodyCapitalized}
          placeholder="Edit comment body"
          required
          onChange={handleChange}
        ></textarea>
        <div className="buttons-details">
          <button className="edit-details" onClick={handleEdit}>
            Edit comment
          </button>
          <button className="delete-details" onClick={handleDelete}>
            Delete comment
          </button>
        </div>
      </div>
    </>
  );
}
