import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  HeartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import "../scss/navbar.scss";
import Logo from "./Logo";
import { useUser } from "../context/UserProvider";

function Navbar() {
  const { user } = useUser();
  const [selected, setSelected] = useState("home");

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    setSelected(e.target.name);
  };

  return (
    <>
      {user && (
        <nav>
          <div className='app__navbar__logo'>
            <Logo />
            <h1 className='app__navbar__label'>PULSE</h1>
          </div>
          <div className='app__navbar__actions'>
            <Link to='/' className='app__navbar__action' name='home' onClick={handleClick}>
              {selected === "home" ? (
                <HomeIconSolid className='app__navbar__icon' />
              ) : (
                <HomeIcon className='app__navbar__icon' />
              )}
              <span className='app__navbar__label'>Home</span>
            </Link>
            <button className='app__navbar__action' name='search' onClick={handleClick}>
              {selected === "search" ? (
                <MagnifyingGlassIcon style={{ strokeWidth: "2.5" }} className='app__navbar__icon' />
              ) : (
                <MagnifyingGlassIcon className='app__navbar__icon' />
              )}
              <span className='app__navbar__label'>Search</span>
            </button>
            <Link
              to='/explore'
              className='app__navbar__action'
              name='explore'
              onClick={handleClick}>
              {selected === "explore" ? (
                <MapIconSolid className='app__navbar__icon' />
              ) : (
                <MapIcon className='app__navbar__icon' />
              )}
              <span className='app__navbar__label'>Explore</span>
            </Link>
            <button className='app__navbar__action' name='notifications' onClick={handleClick}>
              {selected === "notifications" ? (
                <HeartIconSolid className='app__navbar__icon' />
              ) : (
                <HeartIcon className='app__navbar__icon' />
              )}
              <span className='app__navbar__label'>Notifications</span>
            </button>
            <Link
              to='/profile'
              className='app__navbar__action'
              name='profile'
              onClick={handleClick}>
              <img src={user.pfp} alt='user profile' className='app__navbar__icon' />
              <span className='app__navbar__label'>Profile</span>
            </Link>
          </div>
          <div className='app__navbar__footer'>
            <button className='app__navbar__action' name='more' onClick={handleClick}>
              {selected === "more" ? (
                <Bars3Icon style={{ strokeWidth: "2.5" }} className='app__navbar__icon' />
              ) : (
                <Bars3Icon className='app__navbar__icon' />
              )}
              <span className='app__navbar__label'>More</span>
            </button>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
