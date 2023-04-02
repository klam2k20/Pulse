import { EllipsisHorizontalIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { removeComment } from '../../lib/apiRequests';
import { formatCommentTimestamp } from '../../lib/format';
import '../../scss/Post/comment.scss';
import Action from './Action';

function Comment({ comment, handleReply, handleAddLike, handleRemoveLike, setModal }) {
  const [openActions, setOpenActions] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useUser();
  const { username: postAuthor } = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading: isDeleteCommentLoading,
    isError: isDeleteCommentError,
    mutate: deleteComment,
  } = useMutation((c) => removeComment(c.commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
  });

  const showCommentLikes = (e) => {
    e.preventDefault();
    const content = comment.likes.map((l) => ({
      id: l._id,
      name: l.userId.name,
      username: l.userId.username,
      pfp: l.userId.pfp,
    }));
    setModal({
      isOpen: true,
      title: 'Likes',
      content,
    });
  };

  return (
    <>
      <li className='app__comment'>
        <img className='avatar' src={comment.user[0].pfp} loading='lazy' />
        <div className='app__comment__content'>
          <b>{comment.user[0].username}</b> {comment.comment}
          <div className='app__comment__stats '>
            <div>{formatCommentTimestamp(new Date(comment.createdAt))}</div>
            {comment.likes.length > 0 && (
              <div role='button' className='semibold__pointer' onClick={showCommentLikes}>{`${
                comment.likes.length
              } ${comment.likes.length === 1 ? 'like' : 'likes'}`}</div>
            )}
            <div
              role='button'
              className='semibold__pointer'
              onClick={(e) => handleReply(e, comment.user[0].username, comment._id)}>
              Reply
            </div>
          </div>
        </div>

        <div className='app__post__actions'>
          {comment.likes.some((l) => l.userId._id === user._id) ? (
            <FilledHeartIcon onClick={(e) => handleRemoveLike(e, comment._id)} />
          ) : (
            <HeartIcon onClick={(e) => handleAddLike(e, comment._id)} />
          )}
          {(postAuthor === user.username || comment.user[0].username === user.username) && (
            <div className='app__actions__wrapper'>
              <EllipsisHorizontalIcon onClick={() => setOpenActions((prev) => !prev)} />
              {openActions && (
                <div className='app__actions'>
                  <Action
                    icon={<TrashIcon />}
                    text='Delete'
                    onClick={() => deleteComment({ commentId: comment._id })}
                    isLoading={isDeleteCommentLoading}
                    isError={isDeleteCommentError}
                  />
                </div>
              )}
            </div>
          )}
        </div>
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
                  setModal={setModal}
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
