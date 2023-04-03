import { PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../scss/Modals/uploadPhotos.scss';

function UploadPhotos({ setSelectedFiles, setIndex }) {
  const [isDragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...e.dataTransfer.files].slice(0, 5));
      setIndex(1);
    }
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...e.target.files].slice(0, 5));
      setIndex(1);
    }
  };

  return (
    <div
      className={isDragActive ? 'flex__center drag drag__active' : 'flex__center drag'}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragOver}
      onDrop={handleDrop}>
      <PhotoIcon />
      <span>
        Upload or Drag and Drop <br /> Up To Five Photos
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
  );
}

export default UploadPhotos;
