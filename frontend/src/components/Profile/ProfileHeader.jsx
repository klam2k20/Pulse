import { memo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserProvider';
import { addFollowing, removeFollowing } from '../../lib/apiRequests';
import '../../scss/Profile/profileHeader.scss';
import ProfileHeaderLoading from '../StatusIndicator/ProfileHeaderLoading';

function ProfileHeader({ profile, isLoading, openProfileModal, followers, setFollowerModal }) {
  const { user } = useUser();
  const { username } = useParams();
  const queryClient = useQueryClient();

  const followUser = useMutation((u) => addFollowing(u.username), {
    onSuccess: () => queryClient.invalidateQueries(['followers']),
  });

  const unfollowUser = useMutation((u) => removeFollowing(u.username), {
    onSuccess: () => queryClient.invalidateQueries(['followers']),
  });

  const handleFollowUser = (e) => {
    e.preventDefault();
    followUser.mutate({ username });
  };

  const handleUnfollowUser = (e) => {
    e.preventDefault();
    unfollowUser.mutate({ username });
  };

  const showFollowers = (e) => {
    e.preventDefault();
    const content = followers.followers.map((f) => ({
      id: f._id,
      name: f.follower.name,
      username: f.follower.username,
      pfp: f.follower.pfp,
    }));
    setFollowerModal({
      isOpen: true,
      title: 'Followers',
      content,
      isError: false,
    });
  };

  const showFollowing = (e) => {
    e.preventDefault();
    const content = followers.following.map((f) => ({
      id: f._id,
      name: f.followed.name,
      username: f.followed.username,
      pfp: f.followed.pfp,
    }));
    setFollowerModal({
      isOpen: true,
      title: 'Following',
      content,
      isError: false,
    });
  };

  const isFollowing = () => {
    return followers.followers.some((f) => f.follower.username === user.username);
  };

  if (isLoading) return <ProfileHeaderLoading />;

  return (
    <>
      <header className='app__profile__header'>
        <div className='app__profile__img'>
          <img src={profile.pfp} alt='user profile photo' loading='lazy' />
        </div>

        <div className='app__profile__info'>
          <div className='app__profile__bio'>
            <span>
              <b>{profile.name}</b>
              {profile.pronouns !== 'default' && (
                <span className='app__profile__pronouns'>{profile.pronouns}</span>
              )}
            </span>
            <span>{profile.bio}</span>
          </div>

          <div className='app__profile__stats'>
            <span>
              <b>{profile.posts}</b> posts
            </span>
            <span role='button' className='pointer' onClick={showFollowers}>
              <b>{followers.followers.length}</b> followers
            </span>
            <span role='button' className='pointer' onClick={showFollowing}>
              <b>{followers.following.length}</b> following
            </span>
          </div>

          {profile.username === user.username ? (
            <button className='app__profile__btn' onClick={openProfileModal}>
              Edit Profile
            </button>
          ) : (
            <button
              className='app__profile__btn'
              onClick={isFollowing() ? handleUnfollowUser : handleFollowUser}>
              {isFollowing() ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </header>

      <div className='app__profile__button__mobile'>
        {profile.username === user.username ? (
          <button className='app__profile__btn' onClick={openProfileModal}>
            Edit Profile
          </button>
        ) : (
          <button
            className='app__profile__btn'
            onClick={isFollowing() ? handleUnfollowUser : handleFollowUser}>
            {isFollowing() ? 'Unfollow' : 'Follow'}
          </button>
        )}
      </div>

      <div className='app__profile__stats__mobile'>
        <span>
          <b>{profile.posts}</b> <br />
          posts
        </span>
        <span role='button' className='pointer' onClick={showFollowers}>
          <b>{followers.followers.length}</b> <br />
          followers
        </span>
        <span role='button' className='pointer' onClick={showFollowing}>
          <b>{followers.following.length}</b> <br />
          following
        </span>
      </div>
    </>
  );
}

export default memo(ProfileHeader);
