import { useLocation } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { useUser } from '../context/UserProvider';
import { HeartIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import '../scss/Pages/post.scss';
import Caption from '../components/Post/Caption';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addCommentLike,
  addPostLike,
  getComments,
  getPost,
  getPostLikes,
  removeCommentLike,
  removePostLike,
} from '../lib/apiRequests';
import Comment from '../components/Post/Comment';
import { differenceInDays, differenceInHours, differenceInMinutes, format } from 'date-fns';
import { useState } from 'react';
import { postComment } from '../lib/apiRequests';

function Post() {
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const { user } = useUser();
  const postId = useLocation().pathname.split('/')[2];
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(['post'], () => getPost(postId).then((res) => res.data));

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(['comments'], () => getComments(postId).then((res) => res.data));

  const {
    data: likes,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = useQuery(['likes'], () => getPostLikes(postId).then((res) => res.data));

  const commentMutation = useMutation(
    (c) => postComment(c.postId, c.comment, c.parentId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  const addPostLikeMutation = useMutation(
    (l) => addPostLike(l.postId, l.userId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['likes']),
    }
  );

  const removePostLikeMutation = useMutation((l) => removePostLike(l.postId, l.userId), {
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  });

  const addCommentLikeMutation = useMutation(
    (l) => addCommentLike(l.postId, l.userId, l.parentId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  const removeCommentLikeMutation = useMutation(
    (l) => removeCommentLike(l.postId, l.userId, l.parentId),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  if (isPostLoading || isCommentsLoading || isLikesLoading) return <span>Loading...</span>;
  if (isPostError || isCommentsError || isLikesError) return <span>Something went wrong...</span>;
  if (!user) return <span>Something went wrong...</span>;

  const createdAtDate = new Date(post.createdAt);
  const now = Date.now();

  const timestamp =
    differenceInMinutes(now, createdAtDate) > 60
      ? differenceInHours(now, createdAtDate) > 24
        ? differenceInDays(now, createdAtDate) > 7
          ? format(createdAtDate, 'MMMM d')
          : `${differenceInDays(now, createdAtDate)} DAYS AGO`
        : `${differenceInHours(now, createdAtDate)} HOURS AGO`
      : `${differenceInMinutes(now, createdAtDate)} MINUTES AGO`;

  const handleSubmitComment = (e) => {
    e.preventDefault();
    commentMutation.mutate({ postId, comment: comment.trim() });
    setComment('');
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    commentMutation.mutate({
      postId,
      comment: comment.trim().split(' ').slice(1).join(' '),
      parentId: reply,
    });
    setComment('');
    setReply('');
  };

  const handleComment = (e) => {
    e.preventDefault();
    document.getElementById('add__comment').focus();
  };

  const handleReply = (e, replyTo, parentId) => {
    e.preventDefault();
    setReply(parentId);
    setComment(`@${replyTo} `);
    document.getElementById('add__comment').focus();
  };

  const handleAddPostLike = (e) => {
    e.preventDefault();
    addPostLikeMutation.mutate({ postId, userId: user._id });
  };

  const handleRemovePostLike = (e) => {
    e.preventDefault();
    removePostLikeMutation.mutate({ postId, userId: user._id });
  };

  const handleAddCommentLike = (e, commentId) => {
    e.preventDefault();
    addCommentLikeMutation.mutate({ postId, userId: user._id, parentId: commentId });
  };

  const handleRemoveCommentLike = (e, commentId) => {
    e.preventDefault();
    removeCommentLikeMutation.mutate({ postId, userId: user._id, parentId: commentId });
  };

  return (
    <div className='app__post'>
      <div className='app__post__photos'>
        <ImageSlider photos={post.images} />
      </div>
      <div className='app__post__info'>
        <header>
          {user && <Caption avatar={user.pfp} username={user.username} caption={post.caption} />}
        </header>
        <div className='app__post__comments'>
          {isCommentsError && (
            <span>An Error Occurred While Fetching Comments. Please refresh</span>
          )}
          {isCommentsLoading && <span>Loading Comments...</span>}
          {comments &&
            comments.map((c) => (
              <Comment
                key={c._id}
                comment={c}
                handleReply={handleReply}
                handleAddLike={handleAddCommentLike}
                handleRemoveLike={handleRemoveCommentLike}
              />
            ))}
        </div>
        <div className='app__post__stats'>
          {likes.some((l) => l.userId._id === user._id) ? (
            <FilledHeartIcon onClick={handleRemovePostLike} />
          ) : (
            <HeartIcon onClick={handleAddPostLike} />
          )}{' '}
          {likes.length}
          <ChatBubbleOvalLeftIcon onClick={handleComment} /> {comments.length}
        </div>
        <div className='app__post__date'>{timestamp}</div>
        <form
          className='app__post__add__comment'
          onSubmit={reply ? handleSubmitReply : handleSubmitComment}>
          <textarea
            id='add__comment'
            placeholder='Add a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='submit'
            className='primary__btn'
            disabled={comment === '' ? 'disabled' : ''}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
