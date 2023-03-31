import { useState } from 'react';
import '../../scss/Modals/dragAndDrop.scss';

function DragAndDrop({ children, setSelectedFiles, setIndex }) {
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

  return (
    <div
      className={isDragActive ? 'flex__center drag drag__active' : 'flex__center drag'}
      onDragEnter={handleDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragOver}
      onDrop={handleDrop}>
      {children}
    </div>
  );
}

export default DragAndDrop;
