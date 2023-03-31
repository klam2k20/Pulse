import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateProfileModal from '../components/Modal/UpdateProfileModal';
import Grid from '../components/Profile/Grid';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AppError from '../components/StatusIndicator/AppError';
import { getPosts, getUser } from '../lib/apiRequests';
import '../scss/Pages/profile.scss';

function Profile() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [postError, setPostError] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getUser(username).then((res) => res.data),
    onError: (err) => setProfileError(err),
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useQuery({
    queryKey: ['posts', username],
    queryFn: () => getPosts(username).then((res) => res.data),
    onError: (err) => setPostError(err),
  });

  if (isProfileError || isPostsError) {
    if (profileError.response.status === 404 || postError.response.status === 404) {
      return <AppError text='You seem lost.' buttonText='GO HOME' onClick={() => navigate('/')} />;
    } else {
      return (
        <AppError
          text='Something went wrong.'
          buttonText='TRY AGAIN'
          onClick={() => window.location.reload()}
        />
      );
    }
  }

  return (
    <section className='app__profile'>
      <ProfileHeader
        profile={profile}
        isLoading={isProfileLoading}
        openModal={() => setModalOpen(true)}
      />
      <Grid posts={posts} isLoading={isPostsLoading} />
      <UpdateProfileModal isOpen={isModalOpen} close={() => setModalOpen(false)} />
    </section>
  );
}

export default Profile;
