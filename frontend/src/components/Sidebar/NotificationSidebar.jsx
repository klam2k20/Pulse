import { useQuery } from 'react-query';
import Sidebar from './Sidebar';
import { getNotifications } from '../../lib/apiRequests';
import NotificationSection from './NotificationSection';

function NotificationSidebar({ isOpen, close }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications().then((res) => res.data),
    refetchInterval: 60000,
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error...</span>;
  return (
    isOpen && (
      <Sidebar close={close}>
        <h2>Notifications</h2>
        {data.map((n) => (
          <NotificationSection key={n._id} notifications={n} />
        ))}
      </Sidebar>
    )
  );
}

export default NotificationSidebar;
