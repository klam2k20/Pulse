import { useNavigate } from 'react-router-dom';

function User({ user, handleClose }) {
  const navigate = useNavigate();

  const handleLink = (e, username) => {
    e.preventDefault();
    navigate(`/profile/${username}`);
    handleClose();
  };

  return (
    <li className='app__list__item' onClick={(e) => handleLink(e, user.username)}>
      <img className='avatar' src={user.pfp} alt={user.name} loading='lazy' />
      <div>
        <b>{user.username}</b>
        <p className='font__color__light'>{user.name}</p>
      </div>
    </li>
  );
}

export default User;
