import React, { useEffect, useState } from "react";
import Modal from "./modal";
import "../../scss/updateProfile.scss";
import { useUser } from "../../context/UserProvider";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";

function UpdateProfileModal() {
  const { user } = useUser();

  const [selectedFile, setSelectedFile] = useState();
  const [photoPreview, setPhotoPreview] = useState(user.pfp);
  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username,
    pronouns: user.pronouns ? user.pronouns : "default",
    bio: user.bio ? user.bio : "",
  });

  useEffect(() => {
    if (!selectedFile) {
      setPhotoPreview(user.pfp);
      return;
    }
    const photoURL = URL.createObjectURL(selectedFile);
    setPhotoPreview(photoURL);

    return () => URL.revokeObjectURL(photoURL);
  }, [selectedFile]);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handlePhotoPreview = (e) => {
    if (!e.target.files || e.target.files.length === 0) setSelectedFile(undefined);
    else setSelectedFile(e.target.files[0]);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const modal = document.getElementById("modal");
    modal.close();
    setProfile({
      name: user.name,
      username: user.username,
      pronouns: user.pronouns ? user.pronouns : "default",
      bio: user.bio ? user.bio : "",
    });
  };

  /**
   * Submit update form:
   * check image size
   * compress image
   * send request to api to upload image and update profile
   */

  return (
    <>
      {profile && (
        <Modal title='Edit Profile'>
          <form>
            <header className='update__profile__img'>
              <img src={photoPreview} alt='Update Photo' />
              <div>
                <span>
                  <label className='update__profile__upload__img'>
                    <PhotoIcon />
                    Upload Photo
                    <input type='file' accept='image/*' onChange={handlePhotoPreview} />
                  </label>
                </span>
                <span style={{ color: "red" }}>
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
                <input type='text' id='username' value={profile.username} onChange={handleChange} />
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
            <footer className='update__profile__footer'>
              <button className='primary__btn'>Update</button>
              <button className='secondary__btn' onClick={handleCancel}>
                Cancel
              </button>
            </footer>
          </form>
        </Modal>
      )}
    </>
  );
}

export default UpdateProfileModal;
