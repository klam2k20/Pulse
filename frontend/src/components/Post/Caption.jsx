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
        <div className='app__post__actions__wrapper'>
          <EllipsisHorizontalIcon onClick={() => setOpenActions((prev) => !prev)} />
          {openActions && (
            <div className='app__post__actions'>
              <span
                role='button'
                className='app__post__action'
                onClick={() => deletePost({ postId })}>
                <span>
                  <TrashIcon />
                  Delete
                </span>
                {isDeletePostLoading && <LoadingIcon />}
                {isDeletePostError && (
                  <>
                    <ExclamationCircleIcon
                      data-tooltip-id='action-error-tooltip'
                      data-tooltip-html='Oops! An Error Occurred While <br/> Deleting the Post. Try Again Later.'
                    />
                    <Tooltip id='action-error-tooltip' place='bottom' />
                  </>
                )}
              </span>
              {/* <span role='button' className='app__post__action'>
              <span>
                <PencilSquareIcon />
                Edit
              </span>
              <LoadingIcon />
            </span> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Caption;
