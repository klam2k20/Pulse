import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useUser } from '../../context/UserProvider';
import { formatCommentTimestamp } from '../../lib/format';
import '../../scss/Post/comment.scss';

function Comment({ comment, handleReply, handleAddLike, handleRemoveLike }) {
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useUser();

  return (
    <>
      <li className='app__comment'>
        <img src={comment.user[0].pfp} loading='lazy' />
        <div className='app__comment__content'>
          <b>{comment.user[0].username}</b> {comment.comment}
          <div className='app__comment__stats '>
            <div>{formatCommentTimestamp(new Date(comment.createdAt))}</div>
            {comment.likes.length > 0 && (
              <div className='semibold__pointer'>{`${comment.likes.length} ${
                comment.likes.length === 1 ? 'like' : 'likes'
              }`}</div>
            )}
            <div
              role='button'
              className='semibold__pointer'
              onClick={(e) => handleReply(e, comment.user[0].username, comment._id)}>
              Reply
            </div>
          </div>
        </div>

        {comment.likes.some((l) => l.userId === user._id) ? (
          <FilledHeartIcon onClick={(e) => handleRemoveLike(e, comment._id)} />
        ) : (
          <HeartIcon onClick={(e) => handleAddLike(e, comment._id)} />
        )}
      </li>

      {comment.replies?.length > 0 && (
        <>
          <button
            className='semibold__pointer app__replies__btn'
            onClick={() => setShowReplies((prev) => !prev)}>
            <div className='app__reply__line' />
            <span>
              {showReplies
                ? 'Hide Replies'
                : `View ${comment.replies.length === 1 ? 'Reply' : 'Replies'} (${
                    comment.replies.length
                  })`}
            </span>
          </button>
          {showReplies && (
            <ul className='app__replies'>
              {comment.replies?.map((r) => (
                <Comment
                  key={r._id}
                  comment={r}
                  handleReply={(e) => handleReply(e, r.user[0].username, r.parentId)}
                  handleAddLike={handleAddLike}
                  handleRemoveLike={handleRemoveLike}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default Comment;
