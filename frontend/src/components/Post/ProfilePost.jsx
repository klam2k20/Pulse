import { ChatBubbleOvalLeftIcon, HeartIcon, Square2StackIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import '../../scss/Post/profilePost.scss';

function ProfilePost({ post }) {
  return (
    <Link to={`/post/${post._id}`} className='profile__post'>
      <img src={post.images[0]} alt={`Post ${post._id}`} />
      {post.images.length > 1 && (
        <div className='profile__post__overlay__top__right'>
          <Square2StackIcon />
        </div>
      )}
      <div className='flex__center profile__post__overlay'>
        <div className='flex__center profile__post__overlay__center'>
          <span className='flex__center'>
            <HeartIcon />
            <span>{post.likes}</span>
          </span>
          <span className='flex__center'>
            <ChatBubbleOvalLeftIcon />
            <span>{post.comments}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProfilePost;
