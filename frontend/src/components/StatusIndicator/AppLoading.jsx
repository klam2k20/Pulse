import '../../scss/StatusIndicator/appLoading.scss';

function AppLoading() {
  return (
    <div className='flex__center app__loading__container'>
      <svg className='app__loading' viewBox='0 -50 110 100'>
        <polyline
          className='app__loading__icon'
          points='0,0 10,0 15,0 20,-13 24,6 28,-9 30,-2 39,2 42,12 52,-40 56,40 62,2 70,-2 75,-15 80,6 86,-8 90,0 105,0'
        />
      </svg>
    </div>
  );
}

export default AppLoading;
