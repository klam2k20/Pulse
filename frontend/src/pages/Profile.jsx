import "../scss/profile.scss";
import { useUser } from "../context/UserProvider";
import { useQuery } from "react-query";
import { getUser } from "../lib/apiRequests";
import UpdateProfileModal from "../components/Modal/UpdateProfileModal";
import { useState } from "react";
import ProfilePost from "../components/Post/ProfilePost";

function Profile() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = window.location.href.split("/")[4];

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(["profile"], () => getUser(username).then((res) => res.data));

  // Add loading and error pages
  if (isProfileLoading) return <span>"Loading..."</span>;
  if (isProfileError) return <span>"Error..."</span>;
  console.log(profileData);
  return (
    <>
      {user && profileData && (
        <>
          <main className='app__profile'>
            <header className='app__profile__header'>
              <div className='app__profile__header__img'>
                <img src={profileData.user.pfp} alt='user profile' />
              </div>

              <div className='app__profile__header__bio'>
                <div className='app__profile__header__bio__heading'>
                  <span>{profileData.user.username}</span>
                  {profileData.user.username === user.username ? (
                    <button onClick={() => setIsModalOpen(true)}>Edit Profile</button>
                  ) : (
                    <button>Follow</button>
                  )}
                </div>
                <div className='app__profile__header__bio__stats'>
                  <span>
                    <b>{profileData.posts.length}</b> posts
                  </span>
                  <span>
                    <b>{profileData.followers.length}</b> followers
                  </span>
                  <span>
                    <b>{profileData.following.length}</b> following
                  </span>
                </div>
                <div className='app__profile__header__bio__main'>
                  <div>
                    <span>
                      <b>{profileData.user.name}</b>
                    </span>
                    {profileData.user.pronouns !== "default" && (
                      <span className='app__profile__header__bio_pronouns'>
                        {profileData.user.pronouns}
                      </span>
                    )}
                  </div>
                  <span>{profileData.user.bio}</span>
                </div>
              </div>
            </header>

            <div className='app__profile__header__bio__main__mobile'>
              <div>
                <span>
                  <b>{profileData.user.name}</b>
                </span>
                {profileData.user.pronouns !== "default" && (
                  <span className='app__profile__header__bio_pronouns'>
                    {profileData.user.pronouns}
                  </span>
                )}
              </div>
              <span>{profileData.user.bio}</span>
            </div>
            <div className='app__profile__header__bio__stats__mobile'>
              <span>
                <b>{profileData.posts.length}</b> <br />
                posts
              </span>
              <span>
                <b>{profileData.followers.length}</b> <br />
                followers
              </span>
              <span>
                <b>{profileData.following.length}</b> <br />
                following
              </span>
            </div>
            <div className='app__profile__main'>
              {profileData.posts.map((p) => (
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
