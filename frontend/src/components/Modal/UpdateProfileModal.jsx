import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useUser } from '../../context/UserProvider';
import { updateUser, uploadPhoto } from '../../lib/apiRequests';
import { defaultSizes, defaultUrls } from '../../lib/constants';
import '../../scss/Modals/modal.scss';
import '../../scss/Modals/updateProfileModal.scss';
import AppLoading from '../StatusIndicator/AppLoading';
import Modal from './Modal';

function UpdateProfileModal({ isOpen, close }) {
  const { user, setRefetch } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user.pfp);
  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username,
    pronouns: user.pronouns ? user.pronouns : 'default',
    bio: user.bio ? user.bio : '',
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedFile) {
      setPhotoPreview(user.pfp);
      return;
    } else if (selectedFile.name && selectedFile.name === 'default') {
      setPhotoPreview('../../../public/default.png');
      return;
    }
    const photoURL = URL.createObjectURL(selectedFile);
    setPhotoPreview(photoURL);

    return () => URL.revokeObjectURL(photoURL);
  }, [selectedFile]);

  const { isLoading, mutate: updateProfile } = useMutation(
    (u) => updateUser(u.username, u.name, u.pronouns, u.bio, u.pfp).then((res) => res.data),
    {
      onSuccess: () => {
        handleClose();
        setRefetch(true);
        queryClient.invalidateQueries(['profile']);
      },
    }
  );

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhotoPreview = (e) => {
    if (!e.target.files || e.target.files.length === 0) setSelectedFile(null);
    else {
      /** Check photo size is <5MB */
      if (e.target.files[0].size > defaultSizes.maxPhotoSize) {
        toast.error('Size Limited Exceeded. Please Select a Photo Smaller than 5MB');
        return;
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let pfp = photoPreview;
      if (photoPreview === '../../../public/default.png') pfp = defaultUrls.defaultPhoto;
      else if (selectedFile) {
        const { data } = await uploadPhoto(selectedFile);
        pfp = data;
      }
      updateProfile({
        username: user.username,
        name: profile.name,
        pronouns: profile.pronouns,
        bio: profile.bio,
        pfp,
      });
    } catch (err) {
      handleClose();
      console.log(`Update User Profile Error: ${err}`);
      toast.error('Error Updating Profile. Please Try Again Shortly.');
    }
  };

  const handleClose = () => {
    close();
    setSelectedFile(null);
    setProfile({
      name: user.name,
      username: user.username,
      pronouns: user.pronouns ? user.pronouns : 'default',
      bio: user.bio ? user.bio : '',
    });
  };

  const handleRemovePhoto = (e) => {
    e.preventDefault();
    setSelectedFile({ name: 'default' });
  };

  const isProfileUpdated = () => {
    return !(
      photoPreview === user.pfp &&
      profile.name === user.name &&
      (profile.pronouns === user.pronouns || (!user.pronouns && profile.pronouns === 'default')) &&
      (profile.bio === user.bio || (!user.bio && profile.bio === ''))
    );
  };

  return (
    <>
      {isOpen && profile && (
        <Modal close={handleClose}>
          {isLoading && <AppLoading />}
          {!isLoading && (
            <>
              <header className='modal__header'>
                <button className='secondary__btn' onClick={handleClose}>
                  Cancel
                </button>
                <h4>Edit Profile</h4>
                <button
                  className='primary__btn'
                  onClick={handleUpdate}
                  disabled={isProfileUpdated() ? '' : 'disabled'}>
                  Update
                </button>
              </header>

              <form className='update__profile__form'>
                <header className='update__profile__img'>
                  <img src={photoPreview} alt='Update Photo' loading='lazy' />
                  <div>
                    <label className='update__profile__upload__img'>
                      <PhotoIcon />
                      Upload Photo
                      <input
                        type='file'
                        accept='image/*'
                        onChange={handlePhotoPreview}
                        onClick={(e) => (e.target.value = null)}
                      />
                    </label>
                    <span style={{ color: 'red' }} onClick={handleRemovePhoto}>
                      <TrashIcon /> Remove Current Photo
                    </span>
                  </div>
                </header>

                <main className='update__profile__main'>
                  <div>
                    <label htmlFor='name'> Name </label>
                    <input type='text' id='name' value={profile.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label htmlFor='username'> Username </label>
                    <input type='text' id='username' value={profile.username} readOnly />
                  </div>
                  <div>
                    <label htmlFor='pronouns'>Pronouns </label>
                    <select id='pronouns' value={profile.pronouns} onChange={handleChange}>
                      <option value='default'>Choose...</option>
                      <option value='he/him/his'>he/him/his</option>
                      <option value='she/her/her'>she/her/her</option>
                      <option value='they/them/their'>they/them/their</option>
                      <option value='zie/zim/zir'>zie/zim/zir</option>
                      <option value='sie/sie/hir'>sie/sie/hir</option>
                      <option value='ey/em/eir'>ey/em/eir</option>
                      <option value='ve/ver/vis'>ve/ver/vis</option>
                      <option value='tey/ter/tem'>tey/ter/tem</option>
                      <option value='e/em/eir'>e/em/eir</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor='bio'>Bio</label>
                    <textarea
                      id='bio'
                      maxLength='150'
                      rows='7'
                      cols='80'
                      value={profile.bio}
                      onChange={handleChange}
                    />
                  </div>
                </main>
              </form>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default memo(UpdateProfileModal);
