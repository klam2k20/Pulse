import '../../scss/Profile/profileHeader.scss';
import '../../scss/StatusIndicator/profileHeaderLoading.scss';

function ProfileHeaderLoading() {
  return (
    <div className='app__profile'>
      <header className='app__profile__header'>
        <div className='app__profile__img'>
          <span className='app__loading__circle' />
        </div>

        <div className='app__profile__info'>
          <span className='app__loading__line' />
          <span className='app__loading__line' />
          <span className='app__loading__line' />
        </div>
      </header>

      <div className='app__profile__stats__mobile'>
        <span>posts</span>
        <span>followers</span>
        <span>following</span>
      </div>
    </div>
  );
}

export default ProfileHeaderLoading;
