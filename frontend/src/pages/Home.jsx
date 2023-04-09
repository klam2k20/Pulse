import { useEffect, useState } from 'react';
import '../scss/Pages/home.scss';
import { getFeed } from '../lib/apiRequests';
import { useQuery } from 'react-query';
import AppLoading from '../components/StatusIndicator/AppLoading';
import AppError from '../components/StatusIndicator/AppError';
import '../scss/Pages/home.scss';
import Feed from '../components/Post/Feed';

function Home() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    refetch().then((res) => setPosts((prev) => [...new Set([...prev, ...res.data.data])]));
  }, [page]);

  const { isLoading, isError, refetch } = useQuery(['feed', page], () => getFeed(page), {
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    enabled: false,
  });

  if (isLoading) return <AppLoading />;
  if (isError)
    return (
      <AppError
        text='Having trouble loading your feed.'
        buttonText='TRY AGAIN'
        onClick={() => window.location.reload()}
      />
    );
  return (
    <ul className='app__home'>
      {posts.map((p, i) => (
        <Feed key={p._id} post={p} index={i} />
      ))}
    </ul>
  );
}

export default Home;
