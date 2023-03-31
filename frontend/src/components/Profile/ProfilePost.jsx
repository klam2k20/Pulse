import { ChatBubbleOvalLeftIcon, HeartIcon, Square2StackIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import '../../scss/Profile/profilePost.scss';

function ProfilePost({ post }) {
  const { username } = useParams();

  return (
    <Link to={`/${username}/post/${post._id}`} className='profile__post'>
      <img src={post.images[0]} alt={`Post ${post._id}`} loading='lazy' />
      {post.images.length > 1 && (
        <div className='absolute__top__right'>
          <Square2StackIcon />
        </div>
      )}
      <div className='flex__center absolute profile__post__overlay'>
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
