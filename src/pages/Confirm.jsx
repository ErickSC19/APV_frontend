import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axios';
import Alert from '../components/Alert';

const Confirm = () => {
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const params = useParams();

  const { id } = params;
  // console.log(id);
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/veterinarians/confirm/${id}`;
        const { data } = await axiosClient.get(url);

        setConfirmedAccount(true);
        setAlert({
          msg: data.msg

        });
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }

      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirm your account and organize your {' '}<span className='text-black'>Patients</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!loading &&
          <Alert
            alert={alert}
          />}

        {confirmedAccount && (
          <Link
            className='block text-center my-5 text-gray-500'
            to='/'
          >
            Now, you can log in <span className='text-indigo-400 underline'>here</span>
          </Link>
        )}

      </div>
    </>
  );
};

export default Confirm;
