import { Link } from 'react-router-dom';

import PokeBall from '../Posts/pokeball.png';

export function PostCard({
  posts,
  deletePost,
  searchTerm,
  pagesVisited,
  postsPerPage,
}) {
  const postsList = posts.length ? (
    posts
      .filter((post) => {
        if (searchTerm === '') {
          return post;
        } else if (post.title.toLowerCase().includes(searchTerm)) {
          return post;
        }
        return false;
      })
      .slice(pagesVisited, pagesVisited + postsPerPage)
      .map((post) => {
        const postTitle = post.title;
        const postTitleCapitalized =
          postTitle.charAt(0).toUpperCase() + postTitle.slice(1);

        const postBody = post.body;
        const postBodyCapitalized =
          postBody.charAt(0).toUpperCase() + postBody.slice(1);

        return (
          <div className="post card" key={post.id}>
            <img src={PokeBall} alt="Poke Ball" />
            <div className="card-content">
              <Link to={'/posts/' + post.id}>
                <span className="card-title">{postTitleCapitalized}</span>
              </Link>
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
          </div>
        );
      })
  ) : (
    <div className="center">No posts yet</div>
  );

  return <div className="todos collection">{postsList}</div>;
}
