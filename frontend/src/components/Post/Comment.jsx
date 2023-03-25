import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { formatCommentTimestamp } from '../../lib/format';
import '../../scss/Post/comment.scss';

function Comment({ comment, handleReply, handleAddLike, handleRemoveLike }) {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>
      <div className='app__comment'>
        <img src={comment.user[0].pfp} />
        <div className='app__comment__content'>
          <b>{comment.user[0].username}</b> {comment.comment}
          <div className='app__comment__stats'>
            <div>{formatCommentTimestamp(new Date(comment.createdAt))}</div>
            {comment.likes.length > 0 && (
              <div className='app__semibold__pointer'>{comment.likes.length} likes</div>
            )}
            <div
              role='button'
              className='app__semibold__pointer'
              onClick={(e) => handleReply(e, comment.user[0].username, comment._id)}>
              Reply
            </div>
          </div>
        </div>
        {comment.likes.some((l) => l._id) ? (
          <FilledHeartIcon onClick={(e) => handleRemoveLike(e, comment._id)} />
        ) : (
          <HeartIcon onClick={(e) => handleAddLike(e, comment._id)} />
        )}
      </div>
      {comment.replies?.length > 0 && (
        <>
          <button
            className='app__semibold__pointer app__replies__btn'
            onClick={() => setShowReplies((prev) => !prev)}>
            <div className='app__reply__line' />
            {showReplies ? (
              <span>Hide Replies</span>
            ) : (
              <span>{`View Replies (${comment.replies.length})`}</span>
            )}
          </button>
          <ul className='app__replies' style={{ display: showReplies ? 'flex' : 'none' }}>
            {showReplies &&
              comment.replies?.map((r) => (
                <Comment
                  key={r._id}
                  comment={r}
                  handleReply={(e) => handleReply(e, r.user[0].username, r.parentId)}
                  handleAddLike={handleAddLike}
                  handleRemoveLike={handleRemoveLike}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Comment;
