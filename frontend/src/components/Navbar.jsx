import React, { useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  HeartIcon,
  Bars3Icon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  HeartIcon as HeartIconSolid,
  MoonIcon as MoonIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import "../scss/navbar.scss";
import Logo from "./Logo";
import { useUser } from "../context/UserProvider";
import { NavbarLinkItem, NavbarButtonItem } from "./NavbarItem";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useUser();
  const [selected, setSelected] = useState("Home");

  const handleClick = (e) => {
    e.preventDefault();
    setSelected(e.target.name);
  };

  return (
    <>
      {user && (
        <nav>
          <button onClick={handleClick}>
            <Link to='/' className='app__navbar__logo' name='Home'>
              <Logo />
              <h1 className='app__navbar__label'>PULSE</h1>
            </Link>
          </button>

          <div className='app__navbar__actions'>
            <NavbarLinkItem
              name={"Home"}
              handleClick={handleClick}
              icon={<HomeIcon />}
              selectedIcon={<HomeIconSolid />}
              selected={selected}
              page='/'
            />
            <NavbarButtonItem
              name={"Search"}
              handleClick={handleClick}
              icon={<MagnifyingGlassIcon />}
              selectedIcon={<MagnifyingGlassIcon style={{ strokeWidth: "2.5" }} />}
              selected={selected}
            />
            <NavbarLinkItem
              name={"Explore"}
              handleClick={handleClick}
              icon={<MapIcon />}
              selectedIcon={<MapIconSolid />}
              selected={selected}
              page='/explore'
            />
            <NavbarButtonItem
              name={"Notifications"}
              handleClick={handleClick}
              icon={<HeartIcon />}
              selectedIcon={<HeartIconSolid />}
              selected={selected}
            />
            <NavbarButtonItem
              name={"Create"}
              handleClick={handleClick}
              icon={<PlusCircleIcon />}
              selectedIcon={<PlusCircleIconSolid />}
              selected={selected}
            />
            <NavbarLinkItem
              name={"Profile"}
              handleClick={handleClick}
              icon={<img className='app__navbar__item__img' src={user.pfp} alt='user profile' />}
              selectedIcon={
                <img
                  className='app__navbar__item__img'
                  style={{ border: "2px solid black" }}
                  src={user.pfp}
                  alt='user profile'
                />
              }
              selected={selected}
              page='/profile'
            />
          </div>

          <div className='app__navbar__footer'>
            <NavbarButtonItem
              name={"More"}
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
