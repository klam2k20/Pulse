import '../../scss/Post/caption.scss';
import '../../scss/StatusIndicator/captionLoading.scss';

function CaptionLoading() {
  return (
    <div className='app__post__caption'>
      <span className='app__loading__circle' />
      <span className='app__loading__line' />
    </div>
  );
}

export default CaptionLoading;
