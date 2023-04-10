import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../lib/apiRequests';
import '../../scss/Navbar/navheader.scss';
import Logo from '../Logo';

function NavHeader() {
  return (
    <div className='app__navheader'>
      <Link to='/' className='app__navheader__logo'>
        <Logo />
        <h1>PULSE</h1>
      </Link>
      <ArrowLeftOnRectangleIcon
        style={{ width: '24px' }}
        onClick={() => logoutUser().then(() => window.location.reload())}
      />
    </div>
  );
}

export default NavHeader;
