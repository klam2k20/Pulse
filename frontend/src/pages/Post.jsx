import { useLocation } from "react-router-dom";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useUser } from "../context/UserProvider";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import "../scss/post.scss";
import Comment from "../components/Comment";

function Post() {
  //TODO: USE PFP OR USERNAME FROM POST NOT USER
  const { user } = useUser();
  const location = useLocation();
  const post = location.state;
  return (
    <div className='app__post'>
      <div className='app__post__photos'>
        <ImageSlider photos={post.images} />
      </div>
      <div className='app__post__info'>
        //TODO: Make the header just the caption and create a caption component remove caption //
        from comments section
        <header className='app__post__header'>
          {user && (
            <>
              <img src={user.pfp} /> <span>{user.username}</span>
            </>
          )}
        </header>
        <div className='app__post__comments'>
          {user && <Comment avatar={user.pfp} username={user.username} comment={post.caption} />}
        </div>
        <div className='app__post__actions'>
          <HeartIcon />
          <ChatBubbleOvalLeftIcon />
        </div>
        <div className='app__post__likes'>Liked by eric.mach and others</div>
        <div className='app__post__date'>{post.createdAt}</div>
        <form className='app__post__comment'>
          <textarea placeholder='Add a comment' />
          <button className='primary__btn'>Post</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
