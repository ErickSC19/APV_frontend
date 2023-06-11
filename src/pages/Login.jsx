import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';
import Alert from '../components/Alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { keep, changeKeep } = useAuth();
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
        password,
        keep
      });
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        location.reload();
      }, 100);
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
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
              type='text'
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
          <div className='grid grid-cols-2 justify-items-start items-center mt-5'>
            <input
              type='submit'
              value='Log in'
              className='bg-indigo-700 py-3 px-10 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800 transition-colors w-auto'
            />
            <div className='flex items-center'>
              <input type='checkbox' value={keep} name='Keep Session' id='keep' className='rounded-md h-5 w-5 hover:cursor-pointer mr-1 bg-gray-50 focus:ring-indigo-600 checked:hover:bg-indigo-800 checked:active:hover:bg-indigo-800 checked:focus:bg-indigo-600 checked:bg-indigo-600' onChange={e => changeKeep(!keep)} />
              <label htmlFor='keep' className='block text-center text-gray-500'>
                Keep session
              </label>
            </div>
          </div>
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center text-gray-500' to='/register'>
            If you don't have an account you can register{' '}
            <span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </Link>
          <Link
            className='block text-center text-gray-500 mt-5 lg:mt-0'
            to='/change-password'
          >
            Forgot yor password? you can retrieve it{' '}
            <span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
