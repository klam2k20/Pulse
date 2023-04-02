import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import ListModal from '../components/Modal/ListModal';
import Actions from '../components/Post/Actions';
import Caption from '../components/Post/Caption';
import CommentForm from '../components/Post/CommentForm';
import Comments from '../components/Post/Comments';
import AppError from '../components/StatusIndicator/AppError';
import { useUser } from '../context/UserProvider';
import { getComments, getPost, getPostLikes } from '../lib/apiRequests';
import { formatPostTimestamp } from '../lib/format';
import '../scss/Pages/post.scss';

//TODO: WS VS SHORT POLLING VS LONG POLLING VS OTHER

function Post() {
  const [comment, setComment] = useState('');
  const [replyId, setReplyId] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: [],
  });
  const { postId } = useParams();
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

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: '',
      content: [],
    });
  };

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
          avatar={post?.userId.pfp}
          username={post?.userId.username}
          caption={post?.caption}
          isLoading={isPostLoading}
        />
        <Comments
          comments={comments}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isCommentsLoading}
          setModal={setModal}
        />
        <Actions
          likes={likes}
          numComments={comments?.length}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
          setModal={setModal}
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
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
        />
      </div>
      <ListModal
        list={modal.content}
        title={modal.title}
        isOpen={modal.isOpen}
        close={closeModal}
      />
    </div>
  );
}

export default Post;
