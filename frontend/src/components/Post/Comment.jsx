import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid";
import "../../scss/Post/comment.scss";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import differenceInDays from "date-fns/differenceInDays";
import differenceInWeeks from "date-fns/differenceInWeeks";
import { useState } from "react";
import { useUser } from "../../context/UserProvider";

function Comment({ comment, handleReply, handleAddLike, handleRemoveLike }) {
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useUser();

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
    <>
      <div className='app__comment'>
        <img src={comment.user[0].pfp} />
        <div className='app__comment__content'>
          <b>{comment.user[0].username}</b> {comment.comment}
          <div className='app__comment__stats'>
            <div>{createdAt}</div>
            {comment.likes.length > 0 && (
              <div className='app__semibold__pointer'>{comment.likes.length} likes</div>
            )}
            <div
              role='button'
              className='app__semibold__pointer'
              onClick={(e) => handleReply(e, comment.user[0].username, comment._id)}>
              Reply
            </div>
          </div>
        </div>
        {comment.likes.some((l) => l._id) ? (
          <FilledHeartIcon onClick={(e) => handleRemoveLike(e, comment._id)} />
        ) : (
          <HeartIcon onClick={(e) => handleAddLike(e, comment._id)} />
        )}
      </div>
      {comment.replies?.length > 0 && (
        <>
          <button
            className='app__semibold__pointer app__replies__btn'
            onClick={() => setShowReplies((prev) => !prev)}>
            <div className='app__reply__line' />
            {showReplies ? (
              <span>Hide Replies</span>
            ) : (
              <span>{`View Replies (${comment.replies.length})`}</span>
            )}
          </button>
          <ul className='app__replies' style={{ display: showReplies ? "flex" : "none" }}>
            {showReplies &&
              comment.replies?.map((r) => (
                <Comment
                  key={r._id}
                  comment={r}
                  handleReply={(e) => handleReply(e, r.user[0].username, r.parentId)}
                  handleAddLike={handleAddLike}
                  handleRemoveLike={handleRemoveLike}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Comment;
