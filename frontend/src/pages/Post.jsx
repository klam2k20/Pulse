import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import Actions from '../components/Post/Actions';
import Caption from '../components/Post/Caption';
import CommentForm from '../components/Post/CommentForm';
import Comments from '../components/Post/Comments';
import AppError from '../components/StatusIndicator/AppError';
import { useUser } from '../context/UserProvider';
import { getComments, getPost, getPostLikes } from '../lib/apiRequests';
import { formatPostTimestamp } from '../lib/format';
import '../scss/Pages/post.scss';

//TODO: POST LIKES AND COMMENT LIKES
//TODO: WS VS SHORT POLLING VS LONG POLLING VS OTHER

function Post() {
  const [comment, setComment] = useState('');
  const [replyId, setReplyId] = useState('');
  const { user } = useUser();
  const postId = useLocation().pathname.split('/')[3];
  const navigate = useNavigate();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(['post', postId], () => getPost(postId).then((res) => res.data));

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(['comments', postId], () => getComments(postId).then((res) => res.data));

  const {
    data: likes,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = useQuery(['likes', postId], () => getPostLikes(postId).then((res) => res.data));

  if (isPostError || isCommentsError || isLikesError)
    return (
      <AppError
        text="Couldn't load that post."
        buttonText='GO HOME'
        onClick={() => navigate('/')}
      />
    );

  return (
    <div className='app__post'>
      <div className='app__post__photos'>
        <Carousel photos={post?.images} isLoading={isPostLoading} />
      </div>

      <div className='app__post__info'>
        <Caption
          avatar={user.pfp}
          username={user.username}
          caption={post?.caption}
          isLoading={isPostLoading}
        />
        <Comments
          comments={comments}
          postId={postId}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isCommentsLoading}
        />
        <Actions
          likes={likes}
          numComments={comments?.length}
          setComment={setComment}
          setReplyId={setReplyId}
          postId={postId}
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
        />
        {isPostLoading ? (
          <span className='app__loading__date' />
        ) : (
          <div className='font__color__light app__post__date'>
            {formatPostTimestamp(new Date(post.createdAt))}
          </div>
        )}
        <CommentForm
          comment={comment}
          setComment={setComment}
          replyId={replyId}
          setReplyId={setReplyId}
          postId={postId}
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
        />
      </div>
    </div>
  );
}

export default Post;
