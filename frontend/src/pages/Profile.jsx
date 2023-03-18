import "../scss/profile.scss";
import { useUser } from "../context/UserProvider";
import { useQuery } from "react-query";
import { getFollowers, getPosts, getUser } from "../lib/apiRequests";
import UpdateProfileModal from "../components/Modal/UpdateProfileModal";
import { useState } from "react";

function Profile() {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = window.location.href.split("/")[4];

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(["profile"], () => getUser(username).then((res) => res.data));
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery(["posts"], async () => await getPosts(username).then((res) => res.data));
  const {
    data: followerData,
    isLoading: isFollowerLoading,
    isError: isFollwoerError,
  } = useQuery(["followers"], async () => await getFollowers(username).then((res) => res.data));

  // Add loading and error pages
  if (isProfileLoading || isPostLoading || isFollowerLoading) return <span>"Loading..."</span>;
  if (isProfileError || isPostError || isFollwoerError) return <span>"Error..."</span>;

  return (
    <>
      {user && profileData && postData && followerData && (
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
                    <b>{postData.length}</b> posts
                  </span>
                  <span>
                    <b>{followerData.followers.length}</b> followers
                  </span>
                  <span>
                    <b>{followerData.following.length}</b> following
                  </span>
                </div>
                <div className='app__profile__header__bio__main'>
                  <div>
                    <span>
                      <b>{profileData.name}</b>
                    </span>
                    {profileData.pronouns !== "default" && (
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
                {profileData.pronouns !== "default" && (
                  <span className='app__profile__header__bio_pronouns'>{profileData.pronouns}</span>
                )}
              </div>
              <span>{profileData.bio}</span>
            </div>
            <div className='app__profile__header__bio__stats__mobile'>
              <span>
                <b>{postData.length}</b> <br />
                posts
              </span>
              <span>
                <b>{followerData.followers.length}</b> <br />
                followers
              </span>
              <span>
                <b>{followerData.following.length}</b> <br />
                following
              </span>
            </div>
            <div className='app__profile__main'>
              <img src='../../public/pic1.jpeg' />
              <img src='../../public/pic2.jpeg' />
              <img src='../../public/pic3.jpeg' />
              <img src='../../public/pic4.jpeg' />
              <img src='../../public/pic5.jpeg' />
              <img src='../../public/pic6.jpeg' />
              <img src='../../public/pic7.jpeg' />
              <img src='../../public/pic8.jpeg' />
              <img src='../../public/pic1.jpeg' />
              <img src='../../public/pic2.jpeg' />
              <img src='../../public/pic3.jpeg' />
              <img src='../../public/pic4.jpeg' />
              <img src='../../public/pic5.jpeg' />
              <img src='../../public/pic6.jpeg' />
              <img src='../../public/pic7.jpeg' />
              <img src='../../public/pic8.jpeg' />
              <img src='../../public/pic1.jpeg' />
              <img src='../../public/pic2.jpeg' />
              <img src='../../public/pic3.jpeg' />
              <img src='../../public/pic4.jpeg' />
              <img src='../../public/pic5.jpeg' />
              <img src='../../public/pic6.jpeg' />
              <img src='../../public/pic7.jpeg' />
            </div>
          </main>

          <UpdateProfileModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
        </>
      )}
    </>
  );
}

export default Profile;
