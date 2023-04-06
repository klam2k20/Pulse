import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import '../../scss/Sidebar/notification.scss';

function Notification({ notification }) {
  const { user, post, comment } = notification;

  switch (notification.type) {
    case 'like':
      return <LikeNotification user={user} post={post} relativeDate={notification.relativeDate} />;
    case 'comment':
      return (
        <CommentNotification
          user={user}
          post={post}
          comment={comment}
          relativeDate={notification.relativeDate}
        />
      );
    default:
      return <FollowNotification user={user} relativeDate={notification.relativeDate} />;
  }
}

function LikeNotification({ user, post, relativeDate }) {
  const {
    user: { username },
  } = useUser();
  return (
    <Link to={`${username}/post/${post._id}`} className='app__notification__wrapper'>
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
    </Link>
  );
}

function CommentNotification({ user, post, comment, relativeDate }) {
  const {
    user: { username },
  } = useUser();

  return (
    <Link to={`${username}/post/${post._id}`} className='app__notification__wrapper'>
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
    </Link>
  );
}

function FollowNotification({ user, relativeDate }) {
  return (
    <Link to={`/profile/${user.username}`} className='app__notification__wrapper'>
      <div className='flex__center app__notification'>
        <img className='avatar' src={user.pfp} alt={user.username} loading='lazy' />
        <span className='app__notification__text'>
          <b>{user.username}</b> started following you{' '}
          <p className='app__notification__date'>{relativeDate === '0d' ? '' : relativeDate}</p>
        </span>
      </div>
    </Link>
  );
}

export default Notification;
