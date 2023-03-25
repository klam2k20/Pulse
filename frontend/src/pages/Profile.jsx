import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UpdateProfileModal from '../components/Modal/UpdateProfileModal';
import ProfilePost from '../components/Post/ProfilePost';
import { useUser } from '../context/UserProvider';
import { getPosts, getUser } from '../lib/apiRequests';
import '../scss/Pages/profile.scss';

function Profile() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['profile'], () => getUser(username).then((res) => res.data));

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(['posts'], () => getPosts(username).then((res) => res.data));

  // Add loading and error pages
  if (isProfileLoading || isPostLoading) return <span>"Loading..."</span>;
  if (isProfileError || isPostError) return <span>"Error..."</span>;
  return (
    <>
      {user && profileData && (
        <>
          <main className='app__profile'>
            <header className='app__profile__header'>
              <div className='app__profile__header__img'>
                <img src={profileData.pfp} alt='user profile' />
              </div>

              <div className='app__profile__header__bio'>
                <div className='app__profile__header__bio__heading'>
                  <span>{profileData.username}</span>
                  {profileData.username === user.username ? (
                    <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                  ) : (
                    <button>Follow</button>
                  )}
                </div>
                <div className='app__profile__header__bio__stats'>
                  <span>
                    <b>{profileData.posts}</b> posts
                  </span>
                  <span>
                    <b>{profileData.followers}</b> followers
                  </span>
                  <span>
                    <b>{profileData.following}</b> following
                  </span>
                </div>
                <div className='app__profile__header__bio__main'>
                  <div>
                    <span>
                      <b>{profileData.name}</b>
                    </span>
                    {profileData.pronouns !== 'default' && (
                      <span className='app__profile__header__bio_pronouns'>
                        {profileData.pronouns}
                      </span>
                    )}
                  </div>
                  <span>{profileData.bio}</span>
                </div>
              </div>
            </header>

            <div className='app__profile__header__bio__main__mobile'>
              <div>
                <span>
                  <b>{profileData.name}</b>
                </span>
                {profileData.pronouns !== 'default' && (
                  <span className='app__profile__header__bio_pronouns'>{profileData.pronouns}</span>
                )}
              </div>
              <span>{profileData.bio}</span>
            </div>
            <div className='app__profile__header__bio__stats__mobile'>
              <span>
                <b>{profileData.posts}</b> <br />
                posts
              </span>
              <span>
                <b>{profileData.followers}</b> <br />
                followers
              </span>
              <span>
                <b>{profileData.following}</b> <br />
                following
              </span>
            </div>
            <div className='app__profile__main'>
              {postData.map((p) => (
                <ProfilePost key={p._id} post={p} />
              ))}
            </div>
          </main>

          <UpdateProfileModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
        </>
      )}
    </>
  );
}

export default Profile;
