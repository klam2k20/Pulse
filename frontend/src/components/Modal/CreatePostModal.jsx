import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { sharePost, uploadPhoto } from '../../lib/apiRequests';
import { defaultSizes } from '../../lib/constants';
import '../../scss/Modals/modal.scss';
import '../../scss/Modals/createPostModal.scss';
import Carousel from '../Carousel/Carousel';
import AppLoading from '../StatusIndicator/AppLoading';
import Modal from './modal';
import PostEditor from './PostEditor';
import UploadPhotos from './UploadPhotos';

function CreatePostModal({ isOpen, close }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const [index, setIndex] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedFiles.length === 0) setIndex(0);
  }, [selectedFiles]);

  const { isLoading, mutate: createPost } = useMutation(
    (p) => sharePost(p.images, p.caption).then((res) => res.data),
    {
      onSuccess: () => {
        handleClose();
        queryClient.invalidateQueries(['posts']);
      },
    }
  );

  const handleClose = () => {
    setSelectedFiles([]);
    setIndex(0);
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
      Promise.all(promises).then((res) => {
        const images = res.map((data) => data.data);
        createPost({ images, caption });
      });
    } catch (err) {
      handleClose();
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
            <header className='modal__header'>
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
                <UploadPhotos setSelectedFiles={setSelectedFiles} setIndex={setIndex} />
              )}

              {index === 1 && (
                <Carousel photos={selectedFiles} setPhotos={setSelectedFiles} validation={true} />
              )}

              {index === 2 && (
                <PostEditor
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  validation={false}
                  caption={caption}
                  setCaption={setCaption}
                />
              )}
            </main>
          </>
        )}
      </Modal>
    )
  );
}

export default CreatePostModal;
