import '../../scss/StatusIndicator/appError.scss';

function AppError({ text, buttonText, onClick }) {
  return (
    <div className='flex__center app__error__container'>
      <svg className='app__error' viewBox='0 -50 200 100'>
        <polyline
          className='app__error__icon'
          points='0,0 10,0 15,0 20,-13 24,6 28,-9 30,-2 39,2 42,12 52,-40 56,40 62,0 90,0 105,0 200,0'
        />
      </svg>
      <div className=' app__error__text'>
        <h1>Oops!</h1>
        <span>{text}</span>
        <button className='primary__btn' onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default AppError;
