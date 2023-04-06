import Notification from './Notification';
import '../../scss/Sidebar/notificationSection.scss';

function NotificationSection({ notifications }) {
  return (
    <div className='app__notification__section'>
      <h4>{notifications._id}</h4>
      {notifications.notifications.map((n) => (
        <Notification key={n._id} notification={n} />
      ))}
    </div>
  );
}

export default NotificationSection;
