import { useLocation } from "react-router-dom";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { useUser } from "../context/UserProvider";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import "../scss/post.scss";
import Caption from "../components/Caption";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getComments } from "../lib/apiRequests";
import Comment from "../components/Comment";
import { differenceInDays, differenceInHours, differenceInMinutes, format } from "date-fns";
import { useState } from "react";
import { postComment } from "../lib/apiRequests";

function Post() {
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const location = useLocation();
  const post = location.state;
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery(["comments"], () => getComments(post._id).then((res) => res.data));
  const commentMutation = useMutation(
    (c) => postComment(c.postId, c.comment).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(["comments"]),
    }
  );

  const createdAtDate = new Date(post.createdAt);
  const now = Date.now();

  const timestamp =
    differenceInMinutes(now, createdAtDate) > 60
      ? differenceInHours(now, createdAtDate) > 24
        ? differenceInDays(now, createdAtDate) > 7
          ? format(createdAtDate, "MMMM d")
          : `${differenceInDays(now, createdAtDate)} DAYS AGO`
        : `${differenceInHours(now, createdAtDate)} HOURS AGO`
      : `${differenceInMinutes(now, createdAtDate)} MINUTES AGO`;

  const handleComment = (e) => {
    e.preventDefault();
    commentMutation.mutate({ postId: post._id, comment: comment.trim() });
    setComment("");
  };

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
        <div className='app__post__date'>{timestamp}</div>
        <form className='app__post__add__comment' onSubmit={handleComment}>
          <textarea
            placeholder='Add a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='submit'
            className='primary__btn'
            disabled={comment === "" ? "disabled" : ""}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
