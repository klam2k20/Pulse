import '../../scss/Post/caption.scss';

function CaptionLoading() {
  return (
    <div className='app__post__caption__wrapper'>
      <div className='app__post__caption'>
        <span className='app__loading__circle' />
        <span className='app__loading__line' />
      </div>
    </div>
  );
}

export default CaptionLoading;
