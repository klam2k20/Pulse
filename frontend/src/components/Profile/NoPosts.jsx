import '../../scss/Profile/noPosts.scss';
import { CameraIcon } from '@heroicons/react/24/outline';

function NoPosts() {
  return (
    <div className='flex__center app__no__posts'>
      <span>
        <CameraIcon />
      </span>

      <h1>No Posts Yet</h1>
    </div>
  );
}

export default NoPosts;
