import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import UpdatePostModal from '../components/Modal/UpdatePostModal';
import ListModal from '../components/Modal/ListModal';
import Caption from '../components/Post/Caption';
import CommentForm from '../components/Post/CommentForm';
import Comments from '../components/Post/Comments';
import PostActions from '../components/Post/PostActions';
import AppError from '../components/StatusIndicator/AppError';
import { getComments, getPost, getPostLikes } from '../lib/apiRequests';
import { formatPostTimestamp } from '../lib/util';
import '../scss/Pages/post.scss';

function Post() {
  const [comment, setComment] = useState('');
  const [replyId, setReplyId] = useState('');
  const [likeModal, setLikeModal] = useState({
    isOpen: false,
    title: '',
    content: [],
  });
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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

  const closeLikeModal = () => {
    setLikeModal({
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
      <div className='app__post__photos' style={{ paddingTop: isPostLoading ? 0 : '5rem' }}>
        <Carousel photos={post?.images} isLoading={isPostLoading} />
      </div>

      <div className='app__post__info'>
        <Caption
          avatar={post?.userId?.pfp}
          username={post?.userId?.username}
          caption={post?.caption}
          date={post?.createdAt}
          isLoading={isPostLoading}
          openEditModal={() => setEditModalOpen(true)}
        />
        <Comments
          comments={comments}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isCommentsLoading}
          setModal={setLikeModal}
          postId={postId}
        />
        <PostActions
          likes={likes}
          numComments={comments?.length}
          setComment={setComment}
          setReplyId={setReplyId}
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
          setModal={setLikeModal}
          postId={postId}
        />
        <CommentForm
          comment={comment}
          setComment={setComment}
          replyId={replyId}
          setReplyId={setReplyId}
          isLoading={isPostLoading || isLikesLoading || isCommentsLoading}
          postId={postId}
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
      {!isPostLoading && (
        <UpdatePostModal
          isOpen={isEditModalOpen}
          close={() => setEditModalOpen(false)}
          post={post}
        />
      )}
    </div>
  );
}

export default Post;
