import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const RequestChangePassword = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (email === '') {
      setAlert({
        msg: 'We need your email to help',
        error: true
      });
      return;
    }
    try {
      const { data } = await axiosClient.post('veterinarians/forgotten-password', { email });

      setAlert({
        msg: data.msg
      });
    } catch (error) {
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
        <h1 className='text-indigo-600 font-black text-6xl'>
          Retrieve your access, your {' '}<span className='text-black'>Patients</span> need you
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alert
          alert={alert}
                />}
        <form
          onSubmit={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
            >
              Email
            </label>
            <input
              type='text'
              placeholder='Registered email'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:ring-indigo-600'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='Send Instructions'
            className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-colors md:w-auto'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center text-gray-500 lg:flex-1'
            to='/register'
          >
            If you don't have an account you can register{' '}<span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </Link>
          <Link
            className='block text-center text-gray-500 mt-5 lg:mt-0 lg:flex-1 place-self-center'
            to='/'
          >
            Go back to log in{' '}<span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default RequestChangePassword;
