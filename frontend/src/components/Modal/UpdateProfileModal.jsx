import React, { useEffect, useState } from 'react';
import Modal from './modal';
import '../../scss/Modals/updateProfile.scss';
import { useUser } from '../../context/UserProvider';
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { uploadPhoto, updateUser } from '../../lib/apiRequests';
import { useMutation, useQueryClient } from 'react-query';
import { defaultSizes, defaultUrls } from '../../lib/constants';

function UpdateProfileModal({ isOpen, close }) {
  const { user, setUser } = useUser();
  const [selectedFile, setSelectedFile] = useState();
  const [photoPreview, setPhotoPreview] = useState(user.pfp);
  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username,
    pronouns: user.pronouns ? user.pronouns : 'default',
    bio: user.bio ? user.bio : '',
  });

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

  const queryClient = useQueryClient();
  const userMutation = useMutation(
    (u) => updateUser(u.username, u.name, u.pronouns, u.bio, u.pfp).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries(['profile']),
    }
  );

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhotoPreview = (e) => {
    if (!e.target.files || e.target.files.length === 0) setSelectedFile(undefined);
    else {
      /** Check photo size is <5MB */
      if (e.target.files[0].size > defaultSizes.maxPhotoSize) {
        toast.error('File Size Limited Exceeded. Please Select a Photo Smaller than 5MB');
        return;
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let pfp = photoPreview;
      if (pfp === '../../../public/default.png') pfp = defaultUrls.defaultPhoto;
      else if (selectedFile) {
        const { data } = await uploadPhoto(selectedFile);
        pfp = data;
      }
      userMutation.mutate(
        {
          username: user.username,
          name: profile.name,
          pronouns: profile.pronouns,
          bio: profile.bio,
          pfp,
        },
        {
          onSuccess: (data) =>
            setUser((prev) => ({
              ...prev,
              name: data.name,
              pronouns: data.pronouns,
              bio: data.bio,
              pfp: data.pfp,
            })),
        }
      );
      close();
    } catch (err) {
      console.log(`Update User Profile Error: ${err}`);
      toast.error('Error Updating Profile. Please Try Again Shortly.');
    }
  };

  const handleClose = () => {
    close();
    setSelectedFile(undefined);
    setProfile({
      name: user.name,
      username: user.username,
      pronouns: user.pronouns ? user.pronouns : 'default',
      bio: user.bio ? user.bio : '',
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleRemovePhoto = (e) => {
    e.preventDefault();
    setSelectedFile({ name: 'default' });
  };

  return (
    <>
      {isOpen && profile && (
        <Modal close={handleClose}>
          <header className='update__profile__header'>
            <button className='secondary__btn' onClick={handleCancel}>
              Cancel
            </button>
            <h4>Edit Profile</h4>
            <button className='primary__btn' onClick={handleUpdate}>
              Update
            </button>
          </header>
          <form className='update__profile__form'>
            <header className='update__profile__img'>
              <img src={photoPreview} alt='Update Photo' />
              <div>
                <span>
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
                </span>
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
        </Modal>
      )}
    </>
  );
}

export default UpdateProfileModal;
