import '../../scss/Post/commentForm.scss';

function CommentFormLoading() {
  return (
    <div className='app__comment__form'>
      <textarea placeholder='Say something...' readOnly />
      <span className='app__comment__dot comment__disabled' />
    </div>
  );
}

export default CommentFormLoading;
