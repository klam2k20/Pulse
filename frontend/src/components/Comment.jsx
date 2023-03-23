import { HeartIcon } from "@heroicons/react/24/outline";
import "../scss/comment.scss";

function Comment({ comment }) {
  return (
    <div className='app__comment__wrapper'>
      <div className='app__comment'>
        <img src={comment.user[0].pfp} />
        <div className='app__comment__content'>
          <b>{comment.user[0].username}</b> {comment.comment}
          <div className='app__comment__stats'>
            <div className='app__comment__date'>1d</div>
            {comment.likes.length > 0 && (
              <div className='app__comment__likes'>{comment.likes.length} likes</div>
            )}
            <div className='app__comment__reply'>Reply</div>
          </div>
          {comment.replies.length > 0 && (
            <div className='app__comment__replies'>
              <div className='app__comment__reply__line' />
              {`View Replies (${comment.replies.length})`}
            </div>
          )}
        </div>
        <HeartIcon />
      </div>
    </div>
  );
}

export default Comment;
