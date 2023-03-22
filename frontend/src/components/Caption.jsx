import "../scss/caption.scss";

function Caption({ avatar, username, caption }) {
  return (
    <div className='app__post__caption'>
      <img src={avatar} />
      <div>
        <b>{username}</b> {caption}
      </div>
    </div>
  );
}

export default Caption;
