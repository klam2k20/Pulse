import "../scss/comment.scss";

function Comment({ avatar, username, comment }) {
  return (
    <div className='app__comment'>
      <img src={avatar} />
      <span>
        <b>{username}</b> {comment}
      </span>
    </div>
  );
}

export default Comment;
