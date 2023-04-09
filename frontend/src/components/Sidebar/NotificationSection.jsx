import Notification from './Notification';
import '../../scss/Sidebar/notificationSection.scss';

function NotificationSection({ notifications, handleClose }) {
  return (
    <div className='app__notification__section'>
      <h4>{notifications._id}</h4>
      {notifications.notifications.map((n) => (
        <Notification key={n._id} notification={n} handleClose={handleClose} />
      ))}
    </div>
  );
}

export default NotificationSection;
