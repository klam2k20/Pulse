import {
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as FilledHeartIcon,
  HomeIcon as FilledHomeIcon,
  PlusCircleIcon as FilledCircleIcon,
  UserCircleIcon as FilledUserCircleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import '../../scss/Navbar/navfooter.scss';
import { NavbarButtonItem, NavbarLinkItem } from './NavbarItem';
import NotificationSidebar from '../Sidebar/NotificationSidebar';

function NavFooter({ openPostModal }) {
  const [selected, setSelected] = useState('home');
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { user } = useUser();
  const location = useLocation();

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

  const handleClick = (e) => {
    e.preventDefault();
    const name = e.target.name;
    setSelected(name);
    if (name === 'create') {
      openPostModal();
      setToggleSidebar(false);
    } else if (name === 'search' || name == 'notifications') {
      setToggleSidebar((prev) => !prev);
    } else {
      setToggleSidebar(false);
    }
  };

  const closeSidebar = () => {
    setToggleSidebar(false);
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
          icon={<HeartIcon />}
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
      <NotificationSidebar isOpen={toggleSidebar} close={closeSidebar} />
    </>
  );
}

export default NavFooter;
