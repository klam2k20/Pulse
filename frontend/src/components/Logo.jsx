import '../scss/logo.scss';

function Logo() {
  return (
    <div className='flex__center ekg-container'>
      <svg className='ekg' viewBox='0 -50 110 100'>
        <polyline
          className='ekg-line'
          points='0,0 10,0 15,0 20,-13 24,6 28,-9 30,-2 39,2 42,12 52,-40 56,40 62,2 70,-2 75,-15 80,6 86,-8 90,0 105,0'
        />
      </svg>
    </div>
  );
}

export default Logo;
