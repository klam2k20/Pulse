import "../scss/profile.scss";
import { useUser } from "../context/UserProvider";
import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({});
  const { user } = useUser();

  useEffect(() => {
    const url = window.location.href;
    const username = url.split("/")[4];
    if (username === user?.username) setProfile(user);
  }, []);

  return (
    <>
      {user && (
        <section className='app__profile__wrapper'>
          <main className='app__profile'>
            <header className='app__profile__header'>
              <div className='app__profile__header__img'>
                <img src={profile.pfp} alt='user profile' />
              </div>

              <div className='app__profile__header__bio'>
                <div className='app__profile__header__bio__heading'>
                  <span>{profile.username}</span>
                  <button>{profile.username === user.username ? "Edit Profile" : "Follow"}</button>
                </div>
                <div className='app__profile__header__bio__stats'>
                  <span>
                    <b>4</b> posts
                  </span>
                  <span>
                    <b>436</b> followers
                  </span>
                  <span>
                    <b>528</b> following
                  </span>
                </div>
                <div className='app__profile__header__bio__main'>
                  <span>
                    <b>{profile.name}</b>
                  </span>
                  <span>{profile.bio}</span>
                </div>
              </div>
            </header>

            <div className='app__profile__header__bio__main__mobile'>
              <span>
                <b>{profile.name}</b>
              </span>
              <span>{profile.bio}</span>
            </div>
            <div className='app__profile__header__bio__stats__mobile'>
              <span>
                <b>4</b> <br />
                posts
              </span>
              <span>
                <b>436</b> <br />
                followers
              </span>
              <span>
                <b>528</b> <br />
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
        </section>
      )}
    </>
  );
}

export default Profile;
