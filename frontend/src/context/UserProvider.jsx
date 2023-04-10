import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || refetch) {
      setLoading(true);
      axios
        .get('/api/user/profile')
        .then((res) => {
          setLoading(false);
          setRefetch(false);
          setUser(res.data);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          console.log(`Get User Profile Error: ${err}`);
          if (location.pathname !== '/login' && location.pathname !== '/register')
            navigate('/login');
        });
    }
  }, [user, refetch]);

  const contextValue = {
    user,
    setUser,
    isLoading,
    error,
    setError,
    setRefetch,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
