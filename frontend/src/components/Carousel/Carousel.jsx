import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { defaultSizes } from '../../lib/constants';
import { isGCSUri } from '../../lib/util';
import '../../scss/Carousel/carousel.scss';
import CarouselLoading from '../StatusIndicator/CarouselLoading';

function Carousel({ photos, setPhotos, validation, isLoading }) {
  const [index, setIndex] = useState(0);

  const handleAdditionalUploads = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setPhotos((prev) => [...prev, ...e.target.files].slice(0, 5));
    }
  };

  const handleDeleteUpload = (e) => {
    e.preventDefault();
    setPhotos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    if (index == photos.length - 1) setIndex((prev) => prev - 1);
  };

  if (isLoading) return <CarouselLoading />;

  return (
    <>
      {photos.length && (
        <div className='flex__center image__wrapper'>
          <div className='flex__center main__image'>
            <AnimatePresence>
              <motion.img
                key={index}
                src={isGCSUri(photos[index]) ? photos[index] : URL.createObjectURL(photos[index])}
                alt={photos[index].name}
                loading='lazy'
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
              />
            </AnimatePresence>
          </div>

          <span className='flex__center image__carousel__wrapper'>
            <div>
              {[...Array(photos.length).keys()].map((i) => (
                <div
                  key={photos[i].name ? `${photos[i].name}-wrapper` : `${photos[i]}-wrapper`}
                  className='image__container'>
                  <img
                    key={photos[i].name || photos[i]}
                    className={i === index ? 'image__carousel__active' : 'image__carousel'}
                    src={isGCSUri(photos[i]) ? photos[i] : URL.createObjectURL(photos[i])}
                    onClick={() => setIndex(i)}
                    loading='lazy'
                  />
                  {photos[i]?.size > defaultSizes.maxPhotoSize && (
                    <div
                      key={photos[i].name ? `${photos[i].name}-overlay` : `${photos[i]}-overlay`}
                      className='absolute invalid__image'
                      onClick={() => setIndex(i)}
                      data-tooltip-id='image-tooltip'
                      data-tooltip-content='Image Size Exceeds 5MB'
                    />
                  )}
                </div>
              ))}
              <Tooltip id='image-tooltip' place='bottom' />
            </div>
            {validation && (
              <label
                role='button'
                className={
                  photos.length < 7
                    ? 'flex__center image__control'
                    : 'flex__center image__control image__control__disabled'
                }>
                <PlusIcon />
                <input
                  type='file'
                  accept='image/*, video/*'
                  multiple
                  onChange={handleAdditionalUploads}
                  onClick={(e) => (e.target.value = null)}
                  disabled={photos.length < 7 ? '' : 'disabled'}
                />
              </label>
            )}
          </span>
          {validation && (
            <>
              <button
                className='flex__center absolute__top__right image__control '
                onClick={handleDeleteUpload}>
                <XMarkIcon />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default memo(Carousel);
