import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost, uploadPhoto } from '../../lib/apiRequests';
import { isGCSUri } from '../../lib/util';
import '../../scss/Modals/modal.scss';
import AppLoading from '../StatusIndicator/AppLoading';
import Modal from './Modal';
import PostEditor from './PostEditor';

function UpdatePostModal({ isOpen, close, post }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectedFiles(post.images);
    setCaption(post.caption);
  }, [post]);

  const { isLoading, mutate: editPost } = useMutation(
    (p) => updatePost(post._id, p.images, p.caption).then((res) => res.data),
    {
      onSuccess: () => {
        handleClose();
        queryClient.invalidateQueries(['post', post._id]);
      },
    }
  );

  const isPostUpdated = () => {
    return !(
      caption === post.caption &&
      selectedFiles.length === post.images.length &&
      selectedFiles.every((f) => isGCSUri(f))
    );
  };

  const handleClose = () => {
    setSelectedFiles(post.images);
    setCaption(post.caption);
    close();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let images = selectedFiles.filter((f) => isGCSUri(f));
    const newImages = selectedFiles.filter((f) => !isGCSUri(f));

    try {
      const promises = newImages.map((i) => uploadPhoto(i));
      Promise.all(promises).then((res) => {
        images = [...images, ...res.map((data) => data.data)];
        editPost({ images, caption });
      });
    } catch (err) {
      handleClose();
      console.log(`Update Post Error: ${err}`);
      toast.error('Error Updating Post. Please Try Again Shortly.');
    }
  };

  return (
    <>
      {isOpen && (
        <Modal close={handleClose}>
          <header className='modal__header'>
            <button className='secondary__btn' onClick={handleClose}>
              Cancel
            </button>
            <h4>Edit Post</h4>
            <button
              className='primary__btn'
              disabled={isPostUpdated() ? '' : 'disabled'}
              onClick={handleUpdate}>
              Update
            </button>
          </header>

          <main className='flex__center'>
            {isLoading && <AppLoading />}
            {!isLoading && (
              <PostEditor
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                validation={true}
                caption={caption}
                setCaption={setCaption}
              />
            )}
          </main>
        </Modal>
      )}{' '}
    </>
  );
}

export default UpdatePostModal;
