import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { postComment } from '../../lib/apiRequests';
import '../../scss/Post/commentForm.scss';

function CommentForm({ comment, setComment, replyId, setReplyId, postId }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (replyId && !comment.split(' ')[0].includes('@')) setReplyId('');
  }, [comment]);

  const addComment = useMutation(
    (c) => postComment(c.postId, c.comment, c.parentId).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['comments']),
    }
  );

  const handleSubmitComment = (e) => {
    e.preventDefault();
    addComment.mutate({ postId, comment: comment.trim() });
    setComment('');
    setReplyId('');
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    addComment.mutate({
      postId,
      comment: comment.trim().split(' ').slice(1).join(' '),
      parentId: replyId,
    });
    setComment('');
    setReplyId('');
  };

  const isFormIncomplete = () => {
    const words = comment.split(' ');
    return (
      comment === '' ||
      (replyId && words[0].includes('@') && words.length === 1) ||
      (replyId && words[0].includes('@') && words.length === 2 && !words[1])
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (replyId) {
        handleSubmitReply(e);
        return;
      }
      handleSubmitComment(e);
    }
  };

  return (
    <form
      className='app__comment__form'
      onSubmit={replyId ? handleSubmitReply : handleSubmitComment}>
      <textarea
        id='comment__form'
        placeholder='Say something...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span
        className={isFormIncomplete() ? 'app__comment__dot comment__disabled' : 'app__comment__dot'}
      />
    </form>
  );
}

export default CommentForm;
