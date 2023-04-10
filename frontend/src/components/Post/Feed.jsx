import { useState } from 'react';
import { useQuery } from 'react-query';
import { getComments, getPostLikes } from '../../lib/apiRequests';
import '../../scss/Post/feed.scss';
import Carousel from '../Carousel/Carousel';
import PostActions from '../Post/PostActions';
import Caption from './Caption';
import CommentForm from './CommentForm';
import Comments from './Comments';

function Feed({ post, index, setLikeModal, isLoading }) {
  const [comment, setComment] = useState('');
  const [replyId, setReplyId] = useState('');

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(['comments', post._id], () => getComments(post._id).then((res) => res.data));

  const {
    data: likes,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = useQuery(['likes', post._id], () => getPostLikes(post._id).then((res) => res.data));

  if (isCommentsError || isLikesError)
    return (
      <AppError
        text="Couldn't load that post."
        buttonText='GO HOME'
        onClick={() => navigate('/')}
      />
    );

  return (
    <>
      <div className='app__feed'>
        <Caption
          avatar={post.userId.pfp}
          username={post.userId.username}
          caption={post.caption}
          date={post.createdAt}
          isLoading={isLoading || isLikesLoading || isCommentsLoading}
        />
        <div className='app__feed__photos'>
          <Carousel
            photos={post.images}
            isLoading={isLoading || isLikesLoading || isCommentsLoading}
          />
        </div>
        <PostActions
          likes={likes}
          numComments={comments?.length}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isLoading || isLikesLoading || isCommentsLoading}
          setModal={setLikeModal}
          postId={post._id}
          index={index}
        />
        <Comments
          comments={comments}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isLoading || isLikesLoading || isCommentsLoading}
          setModal={setLikeModal}
          hideComments={true}
          postId={post._id}
        />
        <CommentForm
          comment={comment}
          setComment={setComment}
          replyId={replyId}
          setReplyId={setReplyId}
          isLoading={isLoading || isLikesLoading || isCommentsLoading}
          postId={post._id}
        />
      </div>
    </>
  );
}

export default Feed;
