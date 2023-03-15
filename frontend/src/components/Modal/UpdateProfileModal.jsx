import React, { useState } from "react";
import Modal from "./modal";
import "../../scss/updateProfile.scss";
import { useUser } from "../../context/UserProvider";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";

function UpdateProfileModal() {
  const { user } = useUser();
  const [img, setImg] = useState(user.pfp);

  return (
    <Modal title='Edit Profile'>
      <form>
        <header className='update__profile__img'>
          <img src={img} alt='Update Photo' />
          <div>
            <span>
              <PhotoIcon /> Upload Photo
            </span>
            <span>
              <TrashIcon /> Remove Current Photo
            </span>
          </div>
        </header>
        <main className='update__profile__main'>
          <div>
            <label htmlFor='name'> Name </label>
            <input type='text' id='name' />
          </div>
          <div>
            <label htmlFor='username'> Username </label>
            <input type='text' id='username' />
          </div>
          <div>
            <label htmlFor='pronouns'>Pronouns </label>
            <select id='pronouns'>
              <option value='he'>he/him/his</option>
              <option value='she'>she/her/her</option>
              <option value='they'>they/them/their</option>
              <option value='zie'>zie/zim/zir</option>
              <option value='sie'>sie/sie/hir</option>
              <option value='ey'>ey/em/eir</option>
              <option value='ve'>ve/ver/vis</option>
              <option value='tey'>tey/ter/tem</option>
              <option value='e'>e/em/eir</option>
            </select>
          </div>
          <div>
            <label htmlFor='bio'>Bio</label>
            <textarea id='bio' maxLength='150' rows='7' cols='80' />
          </div>
        </main>
      </form>
    </Modal>
  );
}

export default UpdateProfileModal;
