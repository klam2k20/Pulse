import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import ListModal from '../components/Modal/ListModal';
import Feed from '../components/Post/Feed';
import AppError from '../components/StatusIndicator/AppError';
import AppLoading from '../components/StatusIndicator/AppLoading';
import { getFeed } from '../lib/apiRequests';
import '../scss/Pages/home.scss';

function Home() {
  const [likeModal, setLikeModal] = useState({
    isOpen: false,
    title: '',
    content: [],
  });
  const observerElem = useRef(null);

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'feed',
    ({ pageParam = 1 }) => getFeed(pageParam),
    {
      /** Returns a value to be used to get the next page */
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length === 20 ? nextPage : undefined;
      },
    }
  );

  const handleObserver = useCallback(
    (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  const closeLikeModal = () => {
    setLikeModal({
      isOpen: false,
      title: '',
      content: [],
    });
  };

  if (!isSuccess)
    return (
      <AppError
        text='Having trouble loading your feed.'
        buttonText='TRY AGAIN'
        onClick={() => window.location.reload()}
      />
    );

  return (
    <div className='app__home__wrapper'>
      <ul className='app__home'>
        {data.pages.map((page) =>
          page.map((post, i) => (
            <Feed
              key={post._id}
              post={post}
              index={i}
              setLikeModal={setLikeModal}
              isLoading={isFetchingNextPage}
            />
          ))
        )}
      </ul>
      <div className='loader' ref={observerElem}>
        {isFetchingNextPage && hasNextPage && <AppLoading />}
      </div>
      <ListModal
        list={likeModal.content}
        title={likeModal.title}
        isOpen={likeModal.isOpen}
        close={closeLikeModal}
      />
    </div>
  );
}

export default Home;
