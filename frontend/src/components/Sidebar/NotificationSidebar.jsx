import ListLoading from '../StatusIndicator/ListLoading';
import NotificationSection from './NotificationSection';
import Sidebar from './Sidebar';

function NotificationSidebar({ notifications, isLoading, isError, isOpen, close }) {
  return (
    isOpen && (
      <Sidebar close={close}>
        <h2>Notifications</h2>
        {isLoading && <ListLoading />}
        {isError && (
          <AppError
            text='Something went wrong.'
            buttonText='TRY AGAIN'
            onClick={() => window.location.reload()}
          />
        )}
        {!isLoading &&
          !isError &&
          notifications.map((n) => (
            <NotificationSection key={n._id} notifications={n} handleClose={close} />
          ))}
      </Sidebar>
    )
  );
}

export default NotificationSidebar;
