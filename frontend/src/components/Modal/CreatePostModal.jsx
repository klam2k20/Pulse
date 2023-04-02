import { PhotoIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../context/UserProvider';
import { sharePost, uploadPhoto } from '../../lib/apiRequests';
import { defaultSizes } from '../../lib/constants';
import '../../scss/Modals/createPost.scss';
import Carousel from '../Carousel/Carousel';
import AppLoading from '../StatusIndicator/AppLoading';
import DragAndDrop from './DragAndDrop';
import Modal from './modal';

function CreatePostModal({ isOpen, close }) {
  const { user } = useUser();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedFiles.length === 0) setIndex(0);
  }, [selectedFiles]);

  const createPost = useMutation((p) => sharePost(p.images, p.caption).then((res) => res.data), {
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  });

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...e.target.files].slice(0, 5));
      setIndex(1);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setIndex(0);
    setLoading(false);
    setCaption('');
    close();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleSharePost = (e) => {
    e.preventDefault();

    try {
      const promises = selectedFiles.map((f) => uploadPhoto(f));
      setLoading(true);
      Promise.all(promises).then((res) => {
        const images = res.map((data) => data.data);
        createPost.mutate({ images, caption });
        setLoading(false);
      });
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log(`Share Post Error: ${err}`);
      toast.error('Error Sharing Post. Please Try Again Shortly.');
    }
  };

  return (
    isOpen && (
      <Modal close={handleClose}>
        {isLoading && <AppLoading />}
        {!isLoading && (
          <>
            <header className='flex__center create__post__header'>
              {index === 1 && (
                <button className='secondary__btn' onClick={handleCancel}>
                  Cancel
                </button>
              )}
              {index === 2 && (
                <button className='secondary__btn' onClick={() => setIndex(1)}>
                  Previous
                </button>
              )}
              <h4>Create a New Post</h4>
              {index === 1 && (
                <button
                  className='primary__btn'
                  disabled={
                    selectedFiles.some((f) => f.size > defaultSizes.maxPhotoSize) ? 'disabled' : ''
                  }
                  onClick={() => setIndex(2)}>
                  Next
                </button>
              )}
              {index === 2 && (
                <button
                  className='primary__btn'
                  disabled={selectedFiles.length > 0 && caption !== '' ? '' : 'disabled'}
                  onClick={handleSharePost}>
                  Share
                </button>
              )}
            </header>

            <main className='flex__center create__post__content'>
              {index === 0 && (
                <DragAndDrop setSelectedFiles={setSelectedFiles} setIndex={setIndex}>
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
                </DragAndDrop>
              )}

              {index === 1 && (
                <Carousel photos={selectedFiles} setPhotos={setSelectedFiles} validation={true} />
              )}

              {index === 2 && (
                <div className='create__post__caption'>
                  <div className='create__post__caption__header'>
                    <img src={user.pfp} alt='User Profile Photo' loading='lazy' />
                    <span>{user.username}</span>
                  </div>
                  <Carousel
                    photos={selectedFiles}
                    setPhotos={setSelectedFiles}
                    validation={false}
                  />
                  <textarea
                    placeholder='Include a caption...'
                    maxLength='2200'
                    cols='80'
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </div>
              )}
            </main>
          </>
        )}
      </Modal>
    )
  );
}

export default CreatePostModal;
