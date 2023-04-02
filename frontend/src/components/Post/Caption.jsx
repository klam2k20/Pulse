import '../../scss/Post/caption.scss';
import CaptionLoading from '../StatusIndicator/CaptionLoading';
import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { removePost } from '../../lib/apiRequests';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIcon from '../StatusIndicator/LoadingIcon';
import { useUser } from '../../context/UserProvider';
import Action from './Action';

function Caption({ avatar, username, caption, isLoading }) {
  const [openActions, setOpenActions] = useState(false);
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
        <div className='app__actions__wrapper'>
          <EllipsisHorizontalIcon onClick={() => setOpenActions((prev) => !prev)} />
          {openActions && (
            <div className='app__actions'>
              <Action
                icon={<TrashIcon />}
                text='Delete'
                onClick={() => deletePost({ postId })}
                isLoading={isDeletePostLoading}
                isError={isDeletePostError}
              />
              <Action
                icon={<PencilSquareIcon />}
                text='Edit'
                // onClick={() => deletePost(postId)}
                // isLoading={isDeletePostLoading}
                // isError={isDeletePostError}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Caption;
