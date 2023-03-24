import { HeartIcon } from "@heroicons/react/24/outline";
import "../scss/comment.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import differenceInDays from "date-fns/differenceInDays";
import differenceInWeeks from "date-fns/differenceInWeeks";

function Comment({ comment }) {
  const createdAtDate = new Date(comment.createdAt);
  const now = Date.now();
  const createdAt =
    differenceInMinutes(now, createdAtDate) > 60
      ? differenceInHours(now, createdAtDate) > 24
        ? differenceInDays(now, createdAtDate) > 7
          ? `${differenceInWeeks(now, createdAtDate)}w`
          : `${differenceInDays(now, createdAtDate)}d`
        : `${differenceInHours(now, createdAtDate)}h`
      : `${differenceInMinutes(now, createdAtDate)}m`;
  return (
    <div className='app__comment'>
      <img src={comment.user[0].pfp} />
      <div className='app__comment__content'>
        <b>{comment.user[0].username}</b> {comment.comment}
        <div className='app__comment__stats'>
          <div>{createdAt}</div>
          {comment.likes.length > 0 && (
            <div className='app__semibold__pointer'>{comment.likes.length} likes</div>
          )}
          <div className='app__semibold__pointer'>Reply</div>
        </div>
        {comment.replies.length > 0 && (
          <div className='app__semibold__pointer app__comment__replies'>
            <div className='app__comment__reply__line' />
            {`View Replies (${comment.replies.length})`}
          </div>
        )}
      </div>
      <HeartIcon />
    </div>
  );
}

export default Comment;
