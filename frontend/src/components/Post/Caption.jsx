import '../../scss/Post/caption.scss';
import CaptionLoading from '../StatusIndicator/CaptionLoading';

function Caption({ avatar, username, caption, isLoading }) {
  if (isLoading) return <CaptionLoading />;
  return (
    <div className='app__post__caption'>
      <img className='avatar' src={avatar} alt={username} loading='lazy' />
      <span>
        <b>{username}</b> {caption}
      </span>
    </div>
  );
}

export default Caption;
