import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../context/UserProvider';
import { addPostLike, removePostLike } from '../../lib/apiRequests';
import '../../scss/Post/actions.scss';
import ActionsLoading from '../StatusIndicator/ActionsLoading';

function Actions({ likes, numComments, setComment, setReplyId, postId, isLoading, setModal }) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const likePost = useMutation((l) => addPostLike(l.postId).then((res) => res.data), {
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  });

  const unlikePost = useMutation((l) => removePostLike(l.postId), {
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  });

  const handleComment = (e) => {
    e.preventDefault();
    setComment('');
    setReplyId('');
    document.getElementById('comment__form').focus();
  };

  const handleLikePost = (e) => {
    e.preventDefault();
    likePost.mutate({ postId });
  };

  const handleUnlikePost = (e) => {
    e.preventDefault();
    unlikePost.mutate({ postId });
  };

  const showPostLikes = (e) => {
    e.preventDefault();
    const content = likes.map((l) => ({
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

  if (isLoading) return <ActionsLoading />;
  return (
    <div className='app__post__stats'>
      {likes.some((l) => l.userId._id === user._id) ? (
        <FilledHeartIcon onClick={handleUnlikePost} />
      ) : (
        <HeartIcon onClick={handleLikePost} />
      )}
      <button className='primary__btn' onClick={showPostLikes}>
        {likes.length}
      </button>
      <ChatBubbleOvalLeftIcon onClick={handleComment} />
      {numComments}
    </div>
  );
}

export default Actions;
