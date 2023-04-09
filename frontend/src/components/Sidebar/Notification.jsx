import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import '../../scss/Sidebar/notification.scss';

function Notification({ notification, handleClose }) {
  const { user, post, comment } = notification;

  switch (notification.type) {
    case 'like':
      return (
        <LikeNotification
          user={user}
          post={post}
          relativeDate={notification.relativeDate}
          handleClose={handleClose}
        />
      );
    case 'comment':
      return (
        <CommentNotification
          user={user}
          post={post}
          comment={comment}
          relativeDate={notification.relativeDate}
          handleClose={handleClose}
        />
      );
    default:
      return (
        <FollowNotification
          user={user}
          relativeDate={notification.relativeDate}
          handleClose={handleClose}
        />
      );
  }
}

function LikeNotification({ user, post, relativeDate, handleClose }) {
  const {
    user: { username },
  } = useUser();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${username}/post/${post._id}`);
    handleClose();
  };

  return (
    <div className='app__notification__wrapper pointer' onClick={handleClick}>
      <div className='flex__center app__notification'>
        <img className='avatar' src={user.pfp} alt={user.username} loading='lazy' />
        <span className='app__notification__text'>
          <b>{user.username}</b> liked your post{' '}
          <p className='app__notification__date'>{relativeDate === '0d' ? '' : relativeDate}</p>
        </span>
      </div>
      <img
        className='app__notification__img'
        src={post.images[0]}
        alt={post.caption}
        loading='lazy'
      />
    </div>
  );
}

function CommentNotification({ user, post, comment, relativeDate, handleClose }) {
  const {
    user: { username },
  } = useUser();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${username}/post/${post._id}`);
    handleClose();
  };

  return (
    <div className='app__notification__wrapper pointer' onClick={handleClick}>
      <div className='flex__center app__notification'>
        <img className='avatar' src={user.pfp} alt={user.username} loading='lazy' />
        <span className='app__notification__text'>
          <b>{user.username}</b> commented on your post: {comment.comment}{' '}
          <p className='app__notification__date'>{relativeDate === '0d' ? '' : relativeDate}</p>
        </span>
      </div>
      <img
        className='app__notification__img'
        src={post.images[0]}
        alt={post.caption}
        loading='lazy'
      />
    </div>
  );
}

function FollowNotification({ user, relativeDate, handleClose }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/profile/${user.username}`);
    handleClose();
  };

  return (
    <div className='app__notification__wrapper pointer' onClick={handleClick}>
      <div className='flex__center app__notification'>
        <img className='avatar' src={user.pfp} alt={user.username} loading='lazy' />
        <span className='app__notification__text'>
          <b>{user.username}</b> started following you{' '}
          <p className='app__notification__date'>{relativeDate === '0d' ? '' : relativeDate}</p>
        </span>
      </div>
    </div>
  );
}

export default Notification;
