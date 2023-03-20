import Modal from "./modal";
import "../../scss/createPost.scss";
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import ImageSlider from "../ImageSlider/ImageSlider";
import { useUser } from "../../context/UserProvider";
import { defaultSizes } from "../../lib/constants";

function CreatePostModal({ isOpen, close }) {
  const { user } = useUser();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (selectedFiles.length === 0) setIndex(0);
  }, [selectedFiles]);

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
        <div className='flex__center__center create__post__header'>
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
              <button
                className='primary__btn'
                disabled={
                  selectedFiles.some((f) => f.size > defaultSizes.maxPhotoSize) ? "disabled" : ""
                }
                onClick={() => setIndex(2)}>
                Next
              </button>
            ) : (
              <button className='primary__btn'>Share</button>
            ))}
        </div>
        <div className='flex__center__center create__post__content'>
          {index === 0 && (
            <div
              className={
                isDragActive
                  ? "flex__center__center create__post__content__drag drag__active"
                  : "flex__center__center create__post__content__drag"
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
          {index === 1 && (
            <ImageSlider photos={selectedFiles} setPhotos={setSelectedFiles} validation={true} />
          )}
          {index === 2 && (
            <div className='create__post__caption'>
              {user && (
                <div className='create__post__caption__header'>
                  <img src={user.pfp} alt='User Profile Photo' />
                  <span>{user.username}</span>
                </div>
              )}
              <div className='create__post__caption__photo'>
                <ImageSlider
                  photos={selectedFiles}
                  setPhotos={setSelectedFiles}
                  validation={false}
                />
              </div>
              <textarea placeholder='Write a caption...' maxLength='2200' cols='80' />
            </div>
          )}
        </div>
      </Modal>
    )
  );
}

export default CreatePostModal;
