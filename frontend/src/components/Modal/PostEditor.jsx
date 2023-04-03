import { useUser } from '../../context/UserProvider';
import Carousel from '../Carousel/Carousel';
import '../../scss/Modals/postEditor.scss';

function PostEditor({ selectedFiles, setSelectedFiles, validation, caption, setCaption }) {
  const { user } = useUser();
  return (
    <div className='app__post__editor'>
      <div className='app__post__editor__header'>
        <img className='avatar' src={user.pfp} alt={user.name} loading='lazy' />
        <span>{user.username}</span>
      </div>
      <Carousel photos={selectedFiles} setPhotos={setSelectedFiles} validation={validation} />
      <textarea
        placeholder='Include a caption...'
        maxLength='2200'
        cols='80'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </div>
  );
}

export default PostEditor;
