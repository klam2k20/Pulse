import NotificationSection from './NotificationSection';
import NotificationSidebarLoading from '../StatusIndicator/NotificationSidebarLoading';
import Sidebar from './Sidebar';

function NotificationSidebar({ notifications, isLoading, isError, isOpen, close }) {
  if (isLoading) <span>Loading...</span>;
  if (isError) <span>Error...</span>;
  return (
    isOpen && (
      <Sidebar close={close}>
        <h2>Notifications</h2>
        {isLoading && <NotificationSidebarLoading />}
        {isError && (
          <AppError
            text='Something went wrong.'
            buttonText='TRY AGAIN'
            onClick={() => window.location.reload()}
          />
        )}
        {!isLoading &&
          !isError &&
          notifications.map((n) => <NotificationSection key={n._id} notifications={n} />)}
      </Sidebar>
    )
  );
}

export default NotificationSidebar;
