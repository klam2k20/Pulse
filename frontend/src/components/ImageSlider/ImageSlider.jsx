import { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "../../scss/ImageSlider/imageSlider.scss";
import { defaultSizes } from "../../lib/constants";
import { toast } from "react-hot-toast";

function ImageSlider({ photos, setPhotos, validation }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos[index]?.size > defaultSizes.maxPhotoSize)
      toast.error("Please Select a Photo Smaller than 5MB");
  }, [index]);

  const handleControls = (e, direction) => {
    e.preventDefault();
    if (direction === "left" && index > 0) setIndex(index - 1);
    else if (direction === "right" && index < photos.length - 1) setIndex(index + 1);
  };

  const handleAdditionalUploads = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setPhotos((prev) => [...prev, ...e.target.files]);
    }
  };

  const handleDeleteUpload = (e) => {
    e.preventDefault();
    setPhotos((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    if (index == photos.length - 1) setIndex((prev) => prev - 1);
  };

  return (
    <>
      {photos.length > 0 && (
        <div className='image__slider__wrapper'>
          <div className='flex__center image__slider'>
            <img
              src={
                typeof photos[index] === "string" &&
                photos[index].includes("https://storage.googleapis.com")
                  ? photos[index]
                  : URL.createObjectURL(photos[index])
              }
              alt={photos[index].name}
              style={{
                border: validation
                  ? photos[index].size > defaultSizes.maxPhotoSize
                    ? "2px solid red"
                    : "2px solid green"
                  : "0px",
              }}
            />
          </div>
          {photos.length > 1 && (
            <>
              {index > 0 && (
                <button
                  className='flex__center
  r image__slider__control left__control'>
                  <ChevronLeftIcon onClick={(e) => handleControls(e, "left")} />
                </button>
              )}
              {index < photos.length - 1 && (
                <button
                  className='flex__center
  r image__slider__control right__control'>
                  <ChevronRightIcon onClick={(e) => handleControls(e, "right")} />
                </button>
              )}
              <span
                className='flex__center
r image__slider__dots'>
                {[...Array(photos.length).keys()].map((i) => (
                  <div
                    key={photos[i].name || photos[i]}
                    className={`image__slider__dot ${i === index ? "active__dot" : ""}`}
                  />
                ))}
              </span>
            </>
          )}
          {validation && (
            <>
              <label
                className='flex__center
r image__slider__control image__slider__add'>
                <PlusIcon />
                <input
                  type='file'
                  accept='image/*, video/*'
                  multiple
                  onChange={handleAdditionalUploads}
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
              <button
                className='flex__center
  r image__slider__control image__slider__delete'
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

export default ImageSlider;
