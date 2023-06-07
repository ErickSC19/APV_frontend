import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axios';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localToken = useLocalStorage('token');
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const [keep, setKeep] = useState(false);

  const changeKeep = (v) => {
    setKeep(v);
  };

  const closeSession = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(() => {
    const authUser = async () => {
      // eslint-disable-next-line no-undef
      // const token = localStorage.getItem('token');
      if (!localToken) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localToken}`
        }
      };

      try {
        const { data } = await axiosClient('/veterinarians/profile', config);

        setAuth(data);
      } catch (error) {
        console.log(error.message);
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, [localToken]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // eslint-disable-next-line no-undef
      localStorage.removeItem('token');
    };

    if (keep) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        closeSession,
        setAuth,
        changeKeep,
        keep,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
