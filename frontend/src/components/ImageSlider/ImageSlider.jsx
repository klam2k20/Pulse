import { useEffect, useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import "../../scss/imageSlider.scss";
import { defaultSizes } from "../../lib/constants";
import { toast } from "react-hot-toast";

function ImageSlider({ photos, setPhotos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos[index].size > defaultSizes.maxPhotoSize)
      toast.error("Please Select a Photo Smaller than 5MB");
  }, [index]);

  const handleControls = (e, direction) => {
    e.preventDefault();
    if (direction === "left" && index > 0) setIndex(index - 1);
    else if (direction === "right" && index < photos.length - 1) setIndex(index + 1);
  };

  return (
    <div className='image__slider__wrapper'>
      <div className='image__slider'>
        <img
          src={URL.createObjectURL(photos[index])}
          alt={photos[index].originalname}
          style={{
            border:
              photos[index].size > defaultSizes.maxPhotoSize ? "2px solid red" : "2px solid green",
          }}
        />
      </div>
      {photos.length > 1 && (
        <>
          {index > 0 && (
            <button className='image__slider__control left__control'>
              <ChevronLeftIcon onClick={(e) => handleControls(e, "left")} />
            </button>
          )}
          {index < photos.length - 1 && (
            <button className='image__slider__control right__control'>
              <ChevronRightIcon onClick={(e) => handleControls(e, "right")} />
            </button>
          )}
          <span className='image__slider__dots'>
            {[...Array(photos.length).keys()].map((i) => (
              <div className={`image__slider__dot ${i === index ? "active__dot" : ""}`} />
            ))}
          </span>
        </>
      )}
    </div>
  );
}

export default ImageSlider;
