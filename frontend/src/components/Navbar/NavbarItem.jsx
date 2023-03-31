import { Link } from 'react-router-dom';
import '../../scss/Navbar/navbarItem.scss';

function NavbarLinkItem({ name, handleClick, icon, selectedIcon, selected, page }) {
  return (
    <li onClick={handleClick}>
      <Link to={page} className='app__navbar__item' name={name}>
        <div className='app__navbar__item__icon'>{selected === name ? selectedIcon : icon}</div>
        <span
          className='app__navbar__item__label'
          style={{ fontWeight: selected === name ? 'bold' : 'normal' }}>
          {name}
        </span>
      </Link>
    </li>
  );
}

function NavbarButtonItem({ name, handleClick, icon, selectedIcon, selected }) {
  return (
    <li onClick={handleClick}>
      <button className='app__navbar__item' name={name}>
        <div className='app__navbar__item__icon'>{selected === name ? selectedIcon : icon}</div>
        <span
          className='app__navbar__item__label'
          style={{ fontWeight: selected === name ? 'bold' : 'normal' }}>
          {name}
        </span>
      </button>
    </li>
  );
}

export { NavbarLinkItem, NavbarButtonItem };
