import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axiosClient from '../config/axios';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [vToken, setVToken] = useState(false);
  const [mPassword, setMPassword] = useState(false);
  const params = useParams();
  const { token } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: 'Password too short, six characters at least',
        error: true
      });
      return;
    }
    if (password !== rpassword) {
      setAlert({
        msg: 'Passwords must be equal',
        error: true
      });
      return;
    }

    try {
      const url = `/veterinarians/password-change/${token}`;
      const { data } = await axiosClient.post(url, { password });

      setAlert({
        msg: data.msg,
        error: false
      });

      setMPassword(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient.get(`/veterinarians/password-change/${token}`);
        setAlert({
          msg: 'Create your new password'
        });
        setVToken(true);
      } catch (error) {
        setAlert({
          msg: 'There is an error with link',
          error: true
        });
      }
    };
    checkToken();
  }, []);

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

        {vToken
          ? (
            <form
              onSubmit={handleSubmit}
            >
              <div className='my-5'>
                <label
                  className='uppercase text-gray-600 block text-xl font-bold'
                >
                  New Password
                </label>
                <input
                  type='password'
                  placeholder='password'
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:ring-indigo-600'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className='my-5'>
                <label
                  className='uppercase text-gray-600 block text-xl font-bold'
                >
                  Repeat Password
                </label>
                <input
                  type='password'
                  placeholder='password'
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:ring-indigo-600'
                  value={rpassword}
                  onChange={e => setRPassword(e.target.value)}
                />
              </div>
              <input
                type='submit'
                value='Save new password'
                className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 transition-colors md:w-auto'
              />

              {mPassword && (
                <nav className='mt-10 lg:flex lg:justify-between'>
                  <Link
                    className='block text-center text-gray-500'
                    to='/'
                  >
                    Now you can log in <span className='text-indigo-400 underline hover:text-indigo-500 transition-colors'>here</span>
                  </Link>
                </nav>
              )}

            </form>
            )
          : !alert?.error && (<p>Loading...</p>)}

      </div>
    </>
  );
};

export default NewPassword;
