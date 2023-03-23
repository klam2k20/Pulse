import { useLocation } from "react-router-dom";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useUser } from "../context/UserProvider";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import "../scss/post.scss";
import Caption from "../components/Caption";
import { useQuery } from "react-query";
import { getComments } from "../lib/apiRequests";
import Comment from "../components/Comment";

function Post() {
  const { user } = useUser();
  const location = useLocation();
  const post = location.state;
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(["comments"], () => getComments(post._id).then((res) => res.data));

  return (
    <div className='app__post'>
      <div className='app__post__photos'>
        <ImageSlider photos={post.images} />
      </div>
      <div className='app__post__info'>
        <header>
          {user && <Caption avatar={user.pfp} username={user.username} caption={post.caption} />}
        </header>
        <div className='app__post__comments'>
          {isCommentsError && (
            <span>An Error Occurred While Fetching Comments. Please refresh</span>
          )}
          {isCommentsLoading && <span>Loading Comments...</span>}
          {comments && comments.map((c) => <Comment key={c._id} comment={c} />)}
        </div>
        <div className='app__post__stats'>
          <HeartIcon /> {post.likes}
          <ChatBubbleOvalLeftIcon /> {post.comments}
        </div>
        <div className='app__post__date'>{post.createdAt}</div>
        <form className='app__post__add__comment'>
          <textarea placeholder='Add a comment' />
          <button className='primary__btn'>Post</button>
        </form>
      </div>
    </div>
  );
}

export default Post;
