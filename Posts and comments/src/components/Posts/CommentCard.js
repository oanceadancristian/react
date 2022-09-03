import { Link } from 'react-router-dom';

export function CommentCard({
  comments,
  deleteComment,
  pagesVisited,
  commentsPerPage,
}) {
  const commentsList = comments.length ? (
    comments
      .slice(pagesVisited, pagesVisited + commentsPerPage)
      .map((comment) => {
        const commentName = comment.name;
        const commentNameCapitalized =
          commentName.charAt(0).toUpperCase() + commentName.slice(1);

        const commentBody = comment.body;
        const commentBodyCapitalized =
          commentBody.charAt(0).toUpperCase() + commentBody.slice(1);

        return (
          <div className="post card" key={comment.id}>
            <div className="card-content">
              <span className="card-title red-text">
                Name: {commentNameCapitalized}
              </span>
              <span className="card-title red-text">
                Email: {comment.email}
              </span>
              <p>{commentBodyCapitalized}</p>
              <div className="buttons">
                <Link to={'/comments/edit/' + comment.id}>
                  <button className="edit">Edit comment</button>
                </Link>
                <button
                  className="delete"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete comment
                </button>
              </div>
            </div>
          </div>
        );
      })
  ) : (
    <div className="center">No comments yet</div>
  );

  return <div className="todos collection">{commentsList}</div>;
}
