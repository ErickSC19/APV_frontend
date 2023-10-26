import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'Missing values',
        error: true
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/veterinarians/login', {
        email,
        password
      });
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', data.token);
      await login(email, password);
      navigate('/admin');
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg || error.message,
        error: true
      });
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const creds = await loginWithGoogle();
      try {
        const { data } = await axiosClient.post('/veterinarians/google-login', {
          name: creds.user.displayName,
          email: creds.user.email,
          firebaseUid: creds.user.uid,
          confirmed: true
        });
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
    } catch (error) {
      setAlert({
        msg: error.message,
        error: true
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setAlert({
        msg: 'Write an email to reset password.',
        error: true
      });
      return;
    }
    try {
      await resetPassword(email);
      setAlert({
        msg: 'We sent you an email. Check your inbox.',
        error: false
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg || error.message,
        error: true
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl text-center md:text-left'>
          Log in and check your <span className='text-black'>Patients</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alert alert={alert} />}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Registered email'
              className='border w-full p-3 mt-3 bg-gray-50 placeholder:text-gray-400 rounded-xl focus:ring-indigo-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              placeholder='password'
              className='border w-full p-3 mt-3 bg-gray-50 placeholder:text-gray-400 rounded-xl focus:ring-indigo-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='grid md:grid-cols-2 md:gap-0 grid-cols-1 gap-2 mt-5'>
            <input
              type='submit'
              value='Log in'
              className='bg-indigo-700 py-3 px-10 rounded-xl md:rounded-tr-none md:rounded-br-none text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors w-auto'
            />
            <button
              type='button'
              onClick={handleGoogleSignin}
              className='text-indigo-700 py-3 px-10 rounded-xl md:rounded-tl-none md:rounded-bl-none border-indigo-700 border-2 uppercase font-bold hover:cursor-pointer hover:bg-indigo-50 transition-colors w-auto'
            >
              Google login
            </button>
          </div>
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center text-gray-500' to='/register'>
            If you don't have an account you can register{' '}
            <span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </Link>
          <a
            className='block text-center text-gray-500 mt-5 lg:mt-0'
            href='#!'
            onClick={handleResetPassword}
          >
            Forgot yor password? you can retrieve it{' '}
            <span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Login;
