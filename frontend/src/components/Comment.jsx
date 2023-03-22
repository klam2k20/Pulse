import { HeartIcon } from "@heroicons/react/24/outline";
import "../scss/comment.scss";

function Comment({ avatar, username, comment }) {
  return (
    <div className='app__comment__wrapper'>
      <div className='app__comment'>
        <img src={avatar} />
        <div>
          <b>{username}</b> {comment}
        </div>
      </div>
      <HeartIcon />
    </div>
  );
}

export default Comment;
