import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';

const Profile = () => {
  const { user, updateVeterinarian } = useAuth();
  const [alert, setAlert] = useState({});
  const [profile, setProfile] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = profile;

    if ([name, email].includes('')) {
      setAlert({
        msg: 'Email and name are a must',
        error: true
      });
    } else {
      await updateVeterinarian(profile);
    }
  };

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const { msg } = alert;

  return (
    <>
      <AdminNav />
      <h2 className='font-black text-center mb-6 text-3xl'>Edit profile</h2>
      {msg && <Alert alert={alert} />}
      <div className='flex justify-center mb-auto'>
        <div className='w-full md:w-5/6 xl:w-1/2 bg-white shadow rounded-lg p-5'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 my-3 gap-3'>
              <label htmlFor='username' className='uppercase font-bold text-slate-600'>
                Name
              </label>
              <input
                type='text'
                placeholder=''
                className='text-lg rounded-md border-slate-300 bg-slate-50 usm:text-base'
                name='username'
                id='username'
                required
                value={profile.displayName || ''}
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                }}
              />
              <label htmlFor='email' className='uppercase font-bold text-slate-600'>
                Email
              </label>
              <input
                type='email'
                className='text-lg rounded-md border-slate-300 bg-slate-50 usm:text-base'
                name='email'
                id='email'
                required
                value={profile.email || ''}
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                }}
              />
              <label htmlFor='tel' className='uppercase font-bold text-slate-600'>
                Telephone
              </label>
              <input
                type='text'
                className='text-lg rounded-md placeholder:text-gray-400 border-slate-300 bg-slate-50 usm:text-base'
                name='tel'
                id='tel'
                value={profile.tel || ''}
                placeholder='Add a telephone'
                onChange={(e) => {
                  setProfile({ ...profile, tel: e.target.value });
                }}
              />
              <label htmlFor='website' className='uppercase font-bold text-slate-600'>
                Website
              </label>
              <input
                type='text'
                className='text-lg rounded-md border-slate-300 placeholder:text-gray-400 bg-slate-50 usm:text-base'
                name='website'
                id='website'
                value={profile.web || ''}
                placeholder='Add a link to your website'
                onChange={(e) => {
                  setProfile({ ...profile, web: e.target.value });
                }}
              />
            </div>
            <input
              type='submit'
              value='Guardar Cambios'
              disabled={
                !(user.name !== profile.name ||
                user.email !== profile.email)
              }
              className='bg-primary-700 hover:bg-primary-800 disabled:bg-slate-400 disabled:hover:bg-slate-400 hover:cursor-pointer disabled:hover:cursor-default transition-colors px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
