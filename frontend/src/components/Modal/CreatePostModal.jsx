import Modal from "./modal";
import "../../scss/createPost.scss";
import { useState } from "react";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import ImageSlider from "../ImageSlider/ImageSlider";

function CreatePostModal({ isOpen, close }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...e.dataTransfer.files]);
      setActiveStep(1);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setActiveStep(0);
    close();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    isOpen && (
      <Modal close={handleClose}>
        <div className='create_post__header'>
          <button className='secondary__btn' onClick={handleCancel}>
            Cancel
          </button>
          <h4>Share</h4>
          <button className='primary__btn'>Create Post</button>
        </div>
        <div className='create__post__content'>
          {activeStep === 0 && (
            <div
              className={
                isDragActive
                  ? "create__post__content__drag drag__active"
                  : "create__post__content__drag"
              }
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragOver}
              onDrop={handleDrop}>
              <PhotoIcon />
              <span>
                Upload or Drag and Drop <br /> Photos and Videos Here
              </span>
              <label role='button'>
                Browse
                <input
                  type='file'
                  multiple
                  accept='image/*, video/*'
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
            </div>
          )}
          {activeStep === 1 && (
            <ImageSlider>
              {selectedFiles.map((f) => {
                const imageUrl = URL.createObjectURL(f);
                return <img src={imageUrl} alt='selected image' />;
              })}
            </ImageSlider>
          )}
        </div>
      </Modal>
    )
  );
}

export default CreatePostModal;
