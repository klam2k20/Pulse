import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../scss/Post/actions.scss';

function Actions({ children }) {
  const [openActions, setOpenActions] = useState(false);
  return (
    <div className='app__actions__wrapper'>
      <EllipsisHorizontalIcon onClick={() => setOpenActions((prev) => !prev)} />
      {openActions && <div className='app__actions'>{children}</div>}
    </div>
  );
}

export default Actions;
