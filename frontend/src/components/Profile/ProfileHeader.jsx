import { memo } from 'react';
import { useUser } from '../../context/UserProvider';
import '../../scss/Profile/profileHeader.scss';
import ProfileHeaderLoading from '../StatusIndicator/ProfileHeaderLoading';

function ProfileHeader({ profile, isLoading, openModal }) {
  const { user } = useUser();

  if (isLoading) return <ProfileHeaderLoading />;

  return (
    <>
      <header className='app__profile__header'>
        <div className='app__profile__img'>
          <img src={profile.pfp} alt='user profile photo' loading='lazy' />
        </div>

        <div className='app__profile__info'>
          <div className='app__profile__bio'>
            <span>
              <b>{profile.name}</b>
              {profile.pronouns !== 'default' && (
                <span className='app__profile__pronouns'>{profile.pronouns}</span>
              )}
            </span>
            <span>{profile.bio}</span>
          </div>

          <div className='app__profile__stats'>
            <span>
              <b>{profile.posts}</b> posts
            </span>
            <span>
              <b>{profile.followers}</b> followers
            </span>
            <span>
              <b>{profile.following}</b> following
            </span>
          </div>

          {profile.username === user.username ? (
            <button className='app__profile__btn' onClick={openModal}>
              Edit Profile
            </button>
          ) : (
            <button className='app__profile__btn'>Follow</button>
          )}
        </div>
      </header>

      <div className='app__profile__button__mobile'>
        {profile.username === user.username ? (
          <button className='app__profile__btn' onClick={openModal}>
            Edit Profile
          </button>
        ) : (
          <button className='app__profile__btn'>Follow</button>
        )}
      </div>

      <div className='app__profile__stats__mobile'>
        <span>
          <b>{profile.posts}</b> <br />
          posts
        </span>
        <span>
          <b>{profile.followers}</b> <br />
          followers
        </span>
        <span>
          <b>{profile.following}</b> <br />
          following
        </span>
      </div>
    </>
  );
}

export default memo(ProfileHeader);
