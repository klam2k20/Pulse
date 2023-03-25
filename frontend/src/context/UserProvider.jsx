import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/user');
      setUser(data);
    };

    if (!user) {
      getUser().catch((err) => {
        console.log(`Get User Profile: ${err}`);
        navigate('/login');
      });
    } else {
      navigate('/');
      toast.success(`Welcome back, ${user.username}`);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
