import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  HeartIcon,
  Bars3Icon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  HeartIcon as HeartIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "@heroicons/react/24/solid";
import "../../scss/navbar.scss";
import Logo from "../Logo";
import { useUser } from "../../context/UserProvider";
import { NavbarLinkItem, NavbarButtonItem } from "./NavbarItem";
import { Link, useNavigate } from "react-router-dom";
import { defaultUrls } from "../../lib/constants";

function Navbar({ openPostModal }) {
  const { user } = useUser();
  const [selected, setSelected] = useState("home");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setSelected(e.target.name);
    if (e.target.name === "profile") {
      navigate(`/profile/${user.username}`);
    } else if (e.target.name === "create") {
      openPostModal();
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const route = url.split("/")[3];
    if (!route) setSelected("home");
    else if (route === "profile") {
      if (url.split("/")[4] === user?.username) setSelected("profile");
      else setSelected();
    } else setSelected(route);
  }, [user]);

  return (
    <>
      {user && (
        <nav className='app__navbar'>
          <button onClick={handleClick}>
            <Link to='/' className='app__navbar__logo' name='Home'>
              <Logo />
              <h1 className='app__navbar__label'>PULSE</h1>
            </Link>
          </button>

          <div className='app__navbar__actions'>
            <NavbarLinkItem
              name={"home"}
              handleClick={handleClick}
              icon={<HomeIcon />}
              selectedIcon={<HomeIconSolid />}
              selected={selected}
              page='/'
            />
            <NavbarButtonItem
              name={"search"}
              handleClick={handleClick}
              icon={<MagnifyingGlassIcon />}
              selectedIcon={<MagnifyingGlassIcon style={{ strokeWidth: "2.5" }} />}
              selected={selected}
            />
            <NavbarLinkItem
              name={"explore"}
              handleClick={handleClick}
              icon={<MapIcon />}
              selectedIcon={<MapIconSolid />}
              selected={selected}
              page='/explore'
            />
            <NavbarButtonItem
              name={"notifications"}
              handleClick={handleClick}
              icon={<HeartIcon />}
              selectedIcon={<HeartIconSolid />}
              selected={selected}
            />
            <NavbarButtonItem
              name={"create"}
              handleClick={handleClick}
              icon={<PlusCircleIcon />}
              selectedIcon={<PlusCircleIconSolid />}
              selected={selected}
            />
            <NavbarLinkItem
              name={"profile"}
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
                    style={{ border: "2px solid black" }}
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
              name={"more"}
              handleClick={handleClick}
              icon={<Bars3Icon />}
              selectedIcon={<Bars3Icon style={{ strokeWidth: "2.5" }} />}
              selected={selected}
            />
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
