import '../../scss/Post/caption.scss';

function CaptionLoading() {
  return (
    <div className='app__post__caption'>
      <span className='app__loading__circle' />
      <span className='app__loading__line' />
    </div>
  );
}

export default CaptionLoading;
