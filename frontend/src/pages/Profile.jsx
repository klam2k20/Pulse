import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ListModal from '../components/Modal/ListModal';
import UpdateProfileModal from '../components/Modal/UpdateProfileModal';
import Grid from '../components/Profile/Grid';
import ProfileHeader from '../components/Profile/ProfileHeader';
import AppError from '../components/StatusIndicator/AppError';
import { getFollowers, getPosts, getUser } from '../lib/apiRequests';
import '../scss/Pages/profile.scss';

//TODO: DELETE COMMENT AND RELATED REPLIES
//TODO: MOVE ACTIONS INTO OWN COMMENT
//TODO: UPDATE POST

function Profile() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [followerModal, setFollowerModal] = useState({
    isOpen: false,
    title: '',
    content: [],
    isError: false,
  });
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

  const { data: followers, isLoading: isFollowersLoading } = useQuery({
    queryKey: ['followers', username],
    queryFn: () => getFollowers(username).then((res) => res.data),
    onSuccess: () => setFollowerModal((prev) => ({ ...prev, isError: false })),
    onError: () => setFollowerModal((prev) => ({ ...prev, isError: true })),
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

  const closeModal = () => {
    setFollowerModal({
      isOpen: false,
      title: '',
      content: [],
      isError: false,
    });
  };

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
        isLoading={isProfileLoading || isFollowersLoading}
        openProfileModal={() => setIsProfileModalOpen(true)}
        followers={followers}
        setFollowerModal={setFollowerModal}
      />
      <Grid posts={posts} isLoading={isPostsLoading} />
      <UpdateProfileModal isOpen={isProfileModalOpen} close={() => setIsProfileModalOpen(false)} />
      <ListModal
        list={followerModal.content}
        title={followerModal.title}
        isOpen={followerModal.isOpen}
        close={closeModal}
        isError={followerModal.isError}
      />
    </section>
  );
}

export default Profile;
