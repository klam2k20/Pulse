import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import "../../scss/profilePost.scss";

function ProfilePost({ post }) {
  return (
    <div className='profile__post'>
      <img src={post.images[0]} alt={`Post ${post._id}`} />
      {post.images.length > 1 && (
        <div className='profile__post__overlay__top__right'>
          <Square2StackIcon />
        </div>
      )}
      <div className='flex__center__center profile__post__overlay'>
        <div className='flex__center__center profile__post__overlay__center'>
          <HeartIcon />
          <ChatBubbleBottomCenterTextIcon />
        </div>
      </div>
    </div>
  );
}

export default ProfilePost;
