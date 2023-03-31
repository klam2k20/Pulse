import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../context/UserProvider';
import { addPostLike, removePostLike } from '../../lib/apiRequests';
import '../../scss/Post/actions.scss';

function Actions({ likes, numComments, setComment, setReplyId, postId }) {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const likePost = useMutation((l) => addPostLike(l.postId, l.userId).then((res) => res.data), {
    onSuccess: () => queryClient.invalidateQueries(['likes']),
  });

  const unlikePost = useMutation((l) => removePostLike(l.postId, l.userId), {
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
    likePost.mutate({ postId, userId: user._id });
  };

  const handleUnlikePost = (e) => {
    e.preventDefault();
    unlikePost.mutate({ postId, userId: user._id });
  };

  return (
    <div className='app__post__stats'>
      {likes.some((l) => l.userId._id === user._id) ? (
        <FilledHeartIcon onClick={handleUnlikePost} />
      ) : (
        <HeartIcon onClick={handleLikePost} />
      )}
      {likes.length}
      <ChatBubbleOvalLeftIcon onClick={handleComment} />
      {numComments}
    </div>
  );
}

export default Actions;
