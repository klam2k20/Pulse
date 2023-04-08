import '../../scss/StatusIndicator/notificationSidebarLoading.scss';
import '../../scss/Sidebar/notificationSection.scss';

function NotificationSidebarLoading() {
  return (
    <div className='app__notification__section'>
      <div className='app__notification__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__notification__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__notification__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__notification__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
      <div className='app__notification__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
    </div>
  );
}

export default NotificationSidebarLoading;
