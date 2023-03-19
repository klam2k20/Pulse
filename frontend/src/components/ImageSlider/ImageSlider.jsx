import { useState } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import "../../scss/imageSlider.scss";

function ImageSlider({ children }) {
  const [index, setIndex] = useState(0);

  const handleControls = (e, direction) => {
    e.preventDefault();
    if (direction === "left" && index > 0) setIndex(index - 1);
    else if (direction === "right" && index < children.length - 1) setIndex(index + 1);
  };

  return (
    <div className='image__slider__wrapper'>
      <div className='image__slider'>{children[index]}</div>
      <div className='image__slider__controls'>
        <button className='image__slider__control left__control'>
          <ChevronLeftIcon onClick={(e) => handleControls(e, "left")} />
        </button>
        <button className='image__slider__control right__control'>
          <ChevronRightIcon onClick={(e) => handleControls(e, "right")} />
        </button>
        <span className='image__slider__dots'>
          {[...Array(children.length).keys()].map((i) => (
            <div className={`image__slider__dot ${i === index ? "active__dot" : ""}`} />
          ))}
        </span>
      </div>
    </div>
  );
}

export default ImageSlider;
