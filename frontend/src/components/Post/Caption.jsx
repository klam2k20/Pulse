import '../../scss/Post/caption.scss';

function Caption({ avatar, username, caption }) {
  return (
    <div className='app__post__caption'>
      <img src={avatar} alt={username} loading='lazy' />
      <span>
        <b>{username}</b> {caption}
      </span>
    </div>
  );
}

export default Caption;
