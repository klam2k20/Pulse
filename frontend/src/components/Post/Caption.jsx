import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { removePost } from '../../lib/apiRequests';
import '../../scss/Post/caption.scss';
import CaptionLoading from '../StatusIndicator/CaptionLoading';
import Actions from './Actions';

function Caption({ avatar, username, caption, isLoading, openEditModal }) {
  const { user } = useUser();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading: isDeletePostLoading,
    isError: isDeletePostError,
    mutate: deletePost,
  } = useMutation((p) => removePost(p.postId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate(`/profile/${user.username}`);
    },
  });

  if (isLoading) return <CaptionLoading />;

  return (
    <div className='app__post__caption__wrapper'>
      <div className='app__post__caption'>
        <img className='avatar' src={avatar} alt={username} loading='lazy' />
        <span>
          <b>{username}</b> {caption}
        </span>
      </div>
      {username === user.username && (
        <Actions
          deleteOnClick={() => deletePost({ postId })}
          isDeleteLoading={isDeletePostLoading}
          isDeleteError={isDeletePostError}
          openEditModal={openEditModal}
        />
      )}
    </div>
  );
}

export default Caption;
