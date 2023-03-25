import {
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
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { defaultUrls } from '../../lib/constants';
import '../../scss/Navbar/navfooter.scss';
import { NavbarButtonItem, NavbarLinkItem } from './NavbarItem';

function NavFooter({ openPostModal }) {
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
        <nav className='app__navfooter'>
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
        </nav>
      )}
    </>
  );
}

export default NavFooter;
