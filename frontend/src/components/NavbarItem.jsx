import { Link } from "react-router-dom";
import "../scss/navbarItem.scss";

function NavbarLinkItem({ name, handleClick, icon, selectedIcon, selected, page }) {
  return (
    <button onClick={handleClick}>
      <Link to={page} className='app__navbar__item' name={name}>
        <div className='app__navbar__item__icon'>{selected === name ? selectedIcon : icon}</div>
        <span
          className='app__navbar__item__label'
          style={{ fontWeight: selected === name ? "bold" : "normal" }}>
          {name}
        </span>
      </Link>
    </button>
  );
}

function NavbarButtonItem({ name, handleClick, icon, selectedIcon, selected }) {
  return (
    <button className='app__navbar__item' name={name} onClick={handleClick}>
      <div className='app__navbar__item__icon'>{selected === name ? selectedIcon : icon}</div>
      <span
        className='app__navbar__item__label'
        style={{ fontWeight: selected === name ? "bold" : "normal" }}>
        {name}
      </span>
    </button>
  );
}

export { NavbarLinkItem, NavbarButtonItem };
