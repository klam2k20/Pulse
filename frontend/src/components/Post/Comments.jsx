import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../context/UserProvider';
import { addCommentLike, removeCommentLike } from '../../lib/apiRequests';
import '../../scss/Post/comments.scss';
import CommentsLoading from '../StatusIndicator/CommentsLoading';
import Comment from './Comment';

function Comments({ comments, isLoading, postId, setComment, setReplyId }) {
  const [isLaptop, setIsLaptop] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    setIsLaptop(mediaQuery.matches);
    const listener = (e) => setIsLaptop(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const likeComment = useMutation(
    (l) => addCommentLike(l.postId, l.userId, l.parentId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  const unlikeComment = useMutation((l) => removeCommentLike(l.postId, l.userId, l.parentId), {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });

  const handleReply = (e, replyTo, parentId) => {
    e.preventDefault();
    setReplyId(parentId);
    setComment(`@${replyTo} `);
    document.getElementById('comment__form').focus();
  };

  const handleLikeComment = (e, commentId) => {
    e.preventDefault();
    likeComment.mutate({ postId, userId: user._id, parentId: commentId });
  };

  const handleUnlikeComment = (e, commentId) => {
    e.preventDefault();
    unlikeComment.mutate({ postId, userId: user._id, parentId: commentId });
  };

  if (isLoading) return <CommentsLoading />;
  if (isLaptop && comments.length === 0) return;
  if (isLaptop) {
    return (
      <ul className='app__post__comments'>
        <span className='font__color__light' onClick={() => setShowAllComments((prev) => !prev)}>
          {!showAllComments ? `View All ${comments.length} Comments` : 'Hide Comments'}
        </span>
        {!showAllComments ? (
          <Comment
            key={comments[0]._id}
            comment={comments[0]}
            handleReply={handleReply}
            handleAddLike={handleLikeComment}
            handleRemoveLike={handleUnlikeComment}
          />
        ) : (
          comments.map((c) => (
            <Comment
              key={c._id}
              comment={c}
              handleReply={handleReply}
              handleAddLike={handleLikeComment}
              handleRemoveLike={handleUnlikeComment}
            />
          ))
        )}
      </ul>
    );
  }
  return (
    <div className='app__post__comments'>
      {comments.map((c) => (
        <Comment
          key={c._id}
          comment={c}
          handleReply={handleReply}
          handleAddLike={handleLikeComment}
          handleRemoveLike={handleUnlikeComment}
        />
      ))}
    </div>
  );
}

export default Comments;
