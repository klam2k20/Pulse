import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      axios
        .get('/api/user')
        .then((res) => {
          setLoading(false);
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
  }, []);

  const contextValue = {
    user,
    setUser,
    isLoading,
    error,
    setError,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
