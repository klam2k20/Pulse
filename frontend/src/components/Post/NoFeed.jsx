import { UserPlusIcon } from '@heroicons/react/24/outline';
import '../../scss/Post/noFeed.scss';

function NoFeed() {
  return (
    <div className='flex__center app__no__feed'>
      <span>
        <UserPlusIcon />
      </span>

      <h1>Follow Some Friends Here</h1>
    </div>
  );
}

export default NoFeed;
