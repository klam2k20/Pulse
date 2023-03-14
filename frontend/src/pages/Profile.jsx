import "../scss/profile.scss";
import { useUser } from "../context/UserProvider";

function Profile() {
  const { user } = useUser();
  return (
    <>
      {user && (
        <section className='app__profile__wrapper'>
          <main className='app__profile'>
            <header className='app__profile__header'>
              <div className='app__profile__header__img'>
                <img src={user.pfp} alt='user profile' />
              </div>

              <div className='app__profile__header__bio'>
                <div className='app__profile__header__bio__heading'>
                  <span>{user.username}</span>
                  <button>Edit Profile</button>
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
                    <b>{user.name}</b>
                  </span>
                  <span>Just going with the flow atm</span>
                </div>
              </div>
            </header>

            <div className='app__profile__header__bio__main__mobile'>
              <span>
                <b>{user.name}</b>
              </span>
              <span>Just going with the flow atm</span>
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
