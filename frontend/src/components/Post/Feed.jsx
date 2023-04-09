import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getComments, getPostLikes } from '../../lib/apiRequests';
import '../../scss/Post/feed.scss';
import Carousel from '../Carousel/Carousel';
import PostActions from '../Post/PostActions';
import Caption from './Caption';
import CommentForm from './CommentForm';
import Comments from './Comments';
import ListModal from '../Modal/ListModal';

function Feed({ post, index }) {
  const [comment, setComment] = useState('');
  const [replyId, setReplyId] = useState('');
  const [likeModal, setLikeModal] = useState({
    isOpen: false,
    title: '',
    content: [],
  });

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

  const closeLikeModal = () => {
    setLikeModal({
      isOpen: false,
      title: '',
      content: [],
    });
  };

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
        />
        <Link to={`/${post.userId.username}/post/${post._id}`} className='app__feed__photos'>
          <Carousel photos={post.images} />
        </Link>
        <PostActions
          likes={likes}
          numComments={comments?.length}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isLikesLoading || isCommentsLoading}
          setModal={setLikeModal}
          postId={post._id}
          index={index}
        />
        <Comments
          comments={comments}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isCommentsLoading}
          setModal={setLikeModal}
          hideComments={true}
          postId={post._id}
        />
        <CommentForm
          comment={comment}
          setComment={setComment}
          replyId={replyId}
          setReplyId={setReplyId}
          isLoading={isLikesLoading || isCommentsLoading}
          postId={post._id}
        />
      </div>
      {!isLikesLoading && !isCommentsLoading && (
        <ListModal
          list={likeModal.content}
          title={likeModal.title}
          isOpen={likeModal.isOpen}
          close={closeLikeModal}
        />
      )}
    </>
  );
}

export default Feed;
