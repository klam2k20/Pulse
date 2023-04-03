import {
  Bars3Icon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as FilledHeartIcon,
  HomeIcon as FilledHomeIcon,
  PlusCircleIcon as FilledPlusCircleIcon,
  UserCircleIcon as FilledUserCicleIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import '../../scss/Navbar/navbar.scss';
import Logo from '../Logo';
import Sidebar from '../Modal/Sidebar';
import { NavbarButtonItem, NavbarLinkItem } from './NavbarItem';

function Navbar({ openPostModal }) {
  const [selected, setSelected] = useState('home');
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { user } = useUser();
  const location = useLocation();
  const navbar = document.querySelector('.app__navbar');

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
    } else {
      if (toggleSidebar) {
        navbar.classList.remove('app__navbar__shrink');
      } else {
        navbar.classList.add('app__navbar__shrink');
      }
      setToggleSidebar((prev) => !prev);
    }
  };

  const closeSidebar = () => {
    setToggleSidebar(false);
    navbar.classList.remove('app__navbar__shrink');
  };

  return (
    <>
      <nav className='app__navbar'>
        <button onClick={handleClick}>
          <Link to='/' className='app__navbar__logo' name='home'>
            <Logo />
            <h1 className='app__navbar__label'>PULSE</h1>
          </Link>
        </button>

        <ul className='app__navbar__actions'>
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
            name={'notifications'}
            handleClick={handleClick}
            icon={<HeartIcon />}
            selectedIcon={<FilledHeartIcon />}
            selected={selected}
          />
          <NavbarButtonItem
            name={'create'}
            handleClick={handleClick}
            icon={<PlusCircleIcon />}
            selectedIcon={<FilledPlusCircleIcon />}
            selected={selected}
          />
          <NavbarLinkItem
            name={'profile'}
            handleClick={handleClick}
            icon={<UserCircleIcon />}
            selectedIcon={<FilledUserCicleIcon />}
            selected={selected}
            page={`/profile/${user.username}`}
          />
        </ul>

        <div className='app__navbar__footer'>
          <NavbarButtonItem
            name={'more'}
            handleClick={handleClick}
            icon={<Bars3Icon />}
            selectedIcon={<Bars3Icon style={{ strokeWidth: '2.5' }} />}
            selected={selected}
          />
        </div>
      </nav>
      <Sidebar isOpen={toggleSidebar} close={closeSidebar} />
    </>
  );
}

export default Navbar;
