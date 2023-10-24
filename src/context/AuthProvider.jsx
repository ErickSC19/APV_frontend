import { useState, useEffect, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';
import axiosClient from '../config/axios';
// import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const localToken = useLocalStorage('token');
  // const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [keep, setKeep] = useState(false);

  // firebase
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const logout = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token');
    signOut(firebaseAuth);
  };

  const resetPassword = async (email) => sendPasswordResetEmail(firebaseAuth, email);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);
  // ---------------

  const updateVeterinarian = async (update) => {
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
      /* const { data } =  */
      await axiosClient.put(
        `/admins/profile/${update._id}`,
        update,
        config
      );
      // const { confirmed, password, token, __v, ...results } = data;
      // setAuth(results);
      return {
        msg: 'Account Updated'
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      };
    }
  };
  /*   const changeKeep = (v) => {
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
        // console.log(config);
        const { data } = await axiosClient('/veterinarians/profile', config);

        setAuth(data);
      } catch (error) {
        console.log(error.message);
        // eslint-disable-next-line no-undef
        localStorage.removeItem('token');
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []);

  const updatePassword = async (pass) => {
    const { currentPassword, newPassword } = pass;
    const update = {
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('hydmot_token');
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
      const { data } = await axiosClient.put(
        '/admins/update-password',
        update,
        config
      );
      return {
        msg: data.msg
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      };
    }
  };

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
  }, []); */

  return (
    <>
      {/* <FirebaseAuthProvider {...firebaseConfig} firebase={app}> */}
      <AuthContext.Provider
        value={{
          // auth,
          // closeSession,
          // setAuth,
          updateVeterinarian,
          // updatePassword,
          // changeKeep,
          // keep,
          loading,
          signup,
          login,
          user,
          logout,
          loginWithGoogle,
          resetPassword
        }}
      >
        {children}
      </AuthContext.Provider>
      {/* </FirebaseAuthProvider> */}
    </>
  );
};

export { AuthProvider };

export default AuthContext;
