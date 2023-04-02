import { memo } from 'react';
import '../../scss/Profile/grid.scss';
import GridLoading from '../StatusIndicator/GridLoading';
import NoPosts from './NoPosts';
import ProfilePost from './ProfilePost';

//TODO INFINITE SCROLLING AND PAGINATION ON APIS

function Grid({ posts, isLoading }) {
  if (isLoading) return <GridLoading />;

  return posts.length ? (
    <div className='app__grid'>
      {posts.map((p) => (
        <ProfilePost key={p._id} post={p} />
      ))}
    </div>
  ) : (
    <NoPosts />
  );
}

export default memo(Grid);
