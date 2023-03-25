import {
  Bars3Icon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { defaultUrls } from '../../lib/constants';
import '../../scss/Navbar/navbar.scss';
import Logo from '../Logo';
import { NavbarButtonItem, NavbarLinkItem } from './NavbarItem';

function Navbar({ openPostModal }) {
  const [selected, setSelected] = useState('home');
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setSelected(e.target.name);
    if (e.target.name === 'profile') {
      navigate(`/profile/${user.username}`);
    } else if (e.target.name === 'create') {
      openPostModal();
    }
  };

  useEffect(() => {
    if (location.pathname === '/') setSelected('home');
    else if (location.pathname.startsWith('/profile')) {
      if (location.pathname.split('/')[2] === user?.username) setSelected('profile');
    } else setSelected('explore');
  }, [user]);

  return (
    <>
      {user && (
        <nav className='app__navbar'>
          <button onClick={handleClick}>
            <Link to='/' className='app__navbar__logo' name='home'>
              <Logo />
              <h1 className='app__navbar__label'>PULSE</h1>
            </Link>
          </button>

          <div className='app__navbar__actions'>
            <NavbarLinkItem
              name={'home'}
              handleClick={handleClick}
              icon={<HomeIcon />}
              selectedIcon={<HomeIconSolid />}
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
            <NavbarLinkItem
              name={'explore'}
              handleClick={handleClick}
              icon={<MapIcon />}
              selectedIcon={<MapIconSolid />}
              selected={selected}
              page='/explore'
            />
            <NavbarButtonItem
              name={'notifications'}
              handleClick={handleClick}
              icon={<HeartIcon />}
              selectedIcon={<HeartIconSolid />}
              selected={selected}
            />
            <NavbarButtonItem
              name={'create'}
              handleClick={handleClick}
              icon={<PlusCircleIcon />}
              selectedIcon={<PlusCircleIconSolid />}
              selected={selected}
            />
            <NavbarLinkItem
              name={'profile'}
              handleClick={handleClick}
              icon={
                user.pfp !== defaultUrls.defaultPhoto ? (
                  <img className='app__navbar__item__img' src={user.pfp} alt='user profile' />
                ) : (
                  <UserCircleIcon />
                )
              }
              selectedIcon={
                user.pfp !== defaultUrls.defaultPhoto ? (
                  <img
                    className='app__navbar__item__img'
                    style={{ border: '2px solid black' }}
                    src={user.pfp}
                    alt='user profile'
                  />
                ) : (
                  <UserCircleIconSolid />
                )
              }
              selected={selected}
              page='/profile'
            />
          </div>

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
      )}
    </>
  );
}

export default Navbar;
