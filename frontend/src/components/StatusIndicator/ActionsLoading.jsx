import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import '../../scss/Post/postActions.scss';
import '../../scss/StatusIndicator/actionsLoading.scss';

function ActionsLoading() {
  return (
    <div className='app__post__stats'>
      <HeartIcon />
      <span className='app__loading__icon' />
      <ChatBubbleOvalLeftIcon />
      <span className='app__loading__icon' />
    </div>
  );
}

export default ActionsLoading;
