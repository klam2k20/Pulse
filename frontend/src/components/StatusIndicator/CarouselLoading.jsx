import '../../scss/Carousel/carousel.scss';
import '../../scss/StatusIndicator/carouselLoading.scss';

function CarouselLoading() {
  return (
    <div className='flex__center image__wrapper'>
      <span className='app__carousel__loading' />
    </div>
  );
}

export default CarouselLoading;
