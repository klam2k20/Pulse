import {
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  PlusCircleIcon as FilledCircleIcon,
  HeartIcon as FilledHeartIcon,
  HomeIcon as FilledHomeIcon,
  UserCircleIcon as FilledUserCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { getNotifications, updateNotifications } from '../../lib/apiRequests';
import '../../scss/Navbar/navfooter.scss';
import NotificationSidebar from '../Sidebar/NotificationSidebar';
import SearchSidebar from '../Sidebar/SearchSidebar';
import { NavbarButtonItem, NavbarLinkItem } from './NavbarItem';

function NavFooter({ openPostModal }) {
  const [selected, setSelected] = useState('home');
  const [toggleNotifications, setToggleNotifications] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const { user } = useUser();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      location.pathname.startsWith(`/profile/${user.username}`) ||
      location.pathname.startsWith(`/${user.username}/post/`)
    ) {
      setSelected('profile');
    } else if (
      location.pathname.startsWith('/profile/') ||
      location.pathname.split('/')[2] === 'post'
    ) {
      setSelected('search');
    } else setSelected('home');
  }, [user]);

  useEffect(() => {
    if (
      toggleNotifications &&
      !isLoading &&
      !isError &&
      data.length > 0 &&
      !data[0].notifications[0].seen
    ) {
      seenNotifications.mutate();
    }
  }, [toggleNotifications]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications().then((res) => res.data),
    refetchInterval: 60000,
  });

  const seenNotifications = useMutation(() => updateNotifications(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setSelected(name);
    const navbar = document.querySelector('.app__navbar');
    switch (name) {
      case 'create':
        openPostModal();
        break;
      case 'search':
        setToggleNotifications(false);
        toggleSearch
          ? navbar.classList.remove('app__navbar__shrink')
          : navbar.classList.add('app__navbar__shrink');
        setToggleSearch((prev) => !prev);
        break;
      case 'notifications':
        setToggleSearch(false);
        toggleNotifications
          ? navbar.classList.remove('app__navbar__shrink')
          : navbar.classList.add('app__navbar__shrink');
        setToggleNotifications((prev) => !prev);
        break;
      default:
        navbar.classList.remove('app__navbar__shrink');
        setToggleNotifications(false);
        setToggleSearch(false);
    }
  };

  const closeSidebar = () => {
    setToggleNotifications(false);
    setToggleSearch(false);
    const navbar = document.querySelector('.app__navbar');
    navbar.classList.remove('app__navbar__shrink');
  };

  return (
    <>
      <nav className='app__navfooter'>
        <NavbarLinkItem
          name={'home'}
          handleClick={handleClick}
          icon={<HomeIcon />}
          selectedIcon={<FilledHomeIcon />}
          selected={selected}
          page='/'
        />
        <NavbarButtonItem
          name={'search'}
          handleClick={handleClick}
          icon={<MagnifyingGlassIcon />}
          selectedIcon={<MagnifyingGlassIcon style={{ strokeWidth: '2.5' }} />}
          selected={selected}
        />
        <NavbarButtonItem
          name={'create'}
          handleClick={handleClick}
          icon={<PlusCircleIcon />}
          selectedIcon={<FilledCircleIcon />}
          selected={selected}
        />
        <NavbarButtonItem
          name={'notifications'}
          handleClick={handleClick}
          icon={
            !isLoading && !isError && data.length > 0 && !data[0].notifications[0].seen ? (
              <FilledHeartIcon style={{ fill: '#d52a74' }} />
            ) : (
              <HeartIcon />
            )
          }
          selectedIcon={<FilledHeartIcon />}
          selected={selected}
        />
        <NavbarLinkItem
          name={'profile'}
          handleClick={handleClick}
          icon={<UserCircleIcon />}
          selectedIcon={<FilledUserCircleIcon />}
          selected={selected}
          page={`/profile/${user.username}`}
        />
      </nav>
      <NotificationSidebar
        notifications={data}
        isLoading={isLoading}
        isError={isError}
        isOpen={toggleNotifications}
        close={closeSidebar}
      />
      <SearchSidebar isOpen={toggleSearch} close={closeSidebar} />
    </>
  );
}

export default NavFooter;
