import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { addCommentLike, removeCommentLike } from '../../lib/apiRequests';
import '../../scss/Post/comments.scss';
import CommentsLoading from '../StatusIndicator/CommentsLoading';
import Comment from './Comment';
import useMediaQuery from '../../hooks/useMediaQuery';

function Comments({ comments, isLoading, setComment, setReplyId, setModal, hideComments, postId }) {
  const [showAllComments, setShowAllComments] = useState(false);
  const queryClient = useQueryClient();
  const isLaptop = useMediaQuery('(max-width: 1024px)');

  const likeComment = useMutation(
    (l) => addCommentLike(l.postId, l.parentId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  const unlikeComment = useMutation((l) => removeCommentLike(l.postId, l.parentId), {
    onSuccess: () => queryClient.invalidateQueries(['comments']),
  });

  const handleReply = (e, replyTo, parentId) => {
    e.preventDefault();
    setReplyId(parentId);
    setComment(`@${replyTo} `);
    document.getElementsByName('comment__form')[0].focus();
  };

  const handleLikeComment = (e, commentId) => {
    e.preventDefault();
    likeComment.mutate({ postId, parentId: commentId });
  };

  const handleUnlikeComment = (e, commentId) => {
    e.preventDefault();
    unlikeComment.mutate({ postId, parentId: commentId });
  };

  if (isLoading) return <CommentsLoading />;
  if (isLaptop && comments.length === 0) return;
  if ((isLaptop || hideComments) && comments.length > 0) {
    return (
      <ul className='app__post__comments'>
        <span
          className='font__color__light pointer'
          onClick={() => setShowAllComments((prev) => !prev)}>
          {!showAllComments ? `View All ${comments.length} Comments` : 'Hide Comments'}
        </span>
        {!showAllComments ? (
          <Comment
            key={comments[0]._id}
            comment={comments[0]}
            handleReply={handleReply}
            handleAddLike={handleLikeComment}
            handleRemoveLike={handleUnlikeComment}
            setModal={setModal}
          />
        ) : (
          comments.map((c) => (
            <Comment
              key={c._id}
              comment={c}
              handleReply={handleReply}
              handleAddLike={handleLikeComment}
              handleRemoveLike={handleUnlikeComment}
              setModal={setModal}
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
          setModal={setModal}
        />
      ))}
    </div>
  );
}

export default Comments;
