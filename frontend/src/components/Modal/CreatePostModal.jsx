import Modal from "./modal";
import "../../scss/createPost.scss";
import { useState } from "react";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import ImageSlider from "../ImageSlider/ImageSlider";

function CreatePostModal({ isOpen, close }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [index, setIndex] = useState(0);

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
      setIndex(1);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...e.target.files]);
      setIndex(1);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setIndex(0);
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
          {index > 0 &&
            (index === 1 ? (
              <button className='secondary__btn' onClick={handleCancel}>
                Cancel
              </button>
            ) : (
              <button className='secondary__btn' onClick={() => setIndex(1)}>
                Previous
              </button>
            ))}
          <h4>Create a New Post</h4>
          {index > 0 &&
            (index === 1 ? (
              <button className='primary__btn' onClick={() => setIndex(2)}>
                Next
              </button>
            ) : (
              <button className='primary__btn'>Share</button>
            ))}
        </div>
        <div className='create__post__content'>
          {index === 0 && (
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
                  onChange={handleFileUpload}
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
            </div>
          )}
          {index === 1 && <ImageSlider photos={selectedFiles} setPhotos={setSelectedFiles} />}
          {index === 2 && (
            <div className='create__post__caption'>
              <textarea placeholder='Write a caption' />
              <ImageSlider photos={selectedFiles} setPhotos={setSelectedFiles} />
            </div>
          )}
        </div>
      </Modal>
    )
  );
}

export default CreatePostModal;
