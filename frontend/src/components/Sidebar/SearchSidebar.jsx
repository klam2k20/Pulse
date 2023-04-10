import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../../lib/apiRequests';
import '../../scss/Sidebar/search.scss';
import AppError from '../StatusIndicator/AppError';
import ListLoading from '../StatusIndicator/ListLoading';
import User from '../User';
import Sidebar from './Sidebar';

function SearchSidebar({ isOpen, close }) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getUsers(query),
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    keepPreviousData: true,
    onSuccess: (res) => setUsers(res.data),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleClose = () => {
    setQuery('');
    setUsers([]);
    close();
  };

  return (
    isOpen && (
      <Sidebar close={handleClose}>
        <h2>Search</h2>
        <div className='app__search__wrapper'>
          <form className='app__search' onSubmit={handleSearch}>
            <MagnifyingGlassIcon />
            <input
              type='text'
              placeholder='Search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
        {isLoading && <ListLoading />}
        {isError && (
          <AppError
            text='Something went wrong.'
            buttonText='TRY AGAIN'
            onClick={() => window.location.reload()}
          />
        )}
        {!isLoading && !isError && (
          <ul className='app__list'>
            {users.map((u) => (
              <User key={u._id} user={u} handleClose={handleClose} />
            ))}
          </ul>
        )}
      </Sidebar>
    )
  );
}

export default SearchSidebar;
