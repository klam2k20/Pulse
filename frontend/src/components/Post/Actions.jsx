import { EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../scss/Post/actions.scss';
import Action from './Action';

function Actions({ deleteOnClick, isDeleteLoading, isDeleteError, openEditModal }) {
  const [openActions, setOpenActions] = useState(false);

  const handleEditPost = (e) => {
    e.preventDefault();
    setOpenActions(false);
    openEditModal();
  };

  return (
    <div className='app__actions__wrapper'>
      <EllipsisHorizontalIcon onClick={() => setOpenActions((prev) => !prev)} />
      {openActions && (
        <div className='app__actions'>
          <Action
            icon={<TrashIcon />}
            text='Delete'
            onClick={() => deleteOnClick()}
            isLoading={isDeleteLoading}
            isError={isDeleteError}
          />
          {openEditModal && (
            <Action icon={<PencilSquareIcon />} text='Edit' onClick={handleEditPost} />
          )}
        </div>
      )}
    </div>
  );
}

export default Actions;
