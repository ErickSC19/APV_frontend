import { useState, useEffect, createContext } from 'react';
import axiosClient from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const [keep, setKeep] = useState(false);

  const changeKeep = (v) => {
    setKeep(v);
  };
  useEffect(() => {
    const authUser = async () => {
      // eslint-disable-next-line no-undef
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
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
