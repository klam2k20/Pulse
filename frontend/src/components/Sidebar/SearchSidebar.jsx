import AppError from '../StatusIndicator/AppError';
import ListLoading from '../StatusIndicator/ListLoading';
import Sidebar from './Sidebar';
import '../../scss/Sidebar/search.scss';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUsers } from '../../lib/apiRequests';
import User from '../User';

function SearchSidebar({ isOpen, close }) {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const { isLoading, isError, refetch } = useQuery(['search'], () => getUsers(query), {
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    enabled: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch().then((res) => setUsers(res.data.data));
    setQuery('');
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
