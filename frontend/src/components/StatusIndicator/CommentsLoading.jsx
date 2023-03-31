import '../../scss/Post/comments.scss';
import '../../scss/StatusIndicator/commentsLoading.scss';

function CommentsLoading() {
  return (
    <ul className='app__post__comments'>
      <li className='app__comments__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </li>
      <li className='app__comments__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </li>
      <li className='app__comments__loading'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </li>
    </ul>
  );
}

export default CommentsLoading;
