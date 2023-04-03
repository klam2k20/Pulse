import '../../scss/Modals/updateProfile.scss';
import '../../scss/Modals/createPost.scss';
import Modal from './modal';
import { useState } from 'react';
import PostEditor from './PostEditor';
import { isGCSUri } from '../../lib/util';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../../lib/apiRequests';

function EditPostModal({ isOpen, close, post }) {
  const [selectedFiles, setSelectedFiles] = useState(post.images);
  const [caption, setCaption] = useState(post.caption);
  const queryClient = useQueryClient();

  const editPost = useMutation(
    (p) => updatePost(post._id, p.images, p.caption).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['post', post._id]),
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
      });
      editPost.mutate({ images, caption });
      handleClose();
    } catch (err) {
      console.log(`Update Post Error: ${err}`);
      toast.error('Error Updating Post. Please Try Again Shortly.');
    }
  };

  return (
    <>
      {isOpen && (
        <Modal close={handleClose}>
          <header className='update__profile__header'>
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

          <main className='flex__center create__post__content'>
            <PostEditor
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              validation={true}
              caption={caption}
              setCaption={setCaption}
            />
          </main>
        </Modal>
      )}{' '}
    </>
  );
}

export default EditPostModal;
