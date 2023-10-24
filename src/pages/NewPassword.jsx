import React, { useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alert from '../components/Alert';

import useAuth from '../hooks/useAuth';

const NewPassword = () => {
  const { resetPassword } = useAuth();
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, repPassword } = password;

    if (newPassword.length < 6) {
      setAlert({
        msg: 'La nueva contraseña debe tener minimo 6 caracteres',
        error: true
      });
      return;
    }
    if (newPassword !== repPassword) {
      setAlert({
        msg: 'La nueva contraseña no coincide en los dos campos',
        error: true
      });
      return;
    }

    const result = await resetPassword(password);
    setAlert(result);
  };

  const { msg } = alert;
  return (
    <>
      <AdminNav />
      <h2 className='font-black mb-6 text-center text-3xl'>
        Change Password
      </h2>
      {msg && <Alert alert={alert} />}
      <div className='flex justify-center mb-auto'>
        <div className='w-full md:w-5/6 xl:w-1/2 bg-white shadow rounded-lg p-5'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 my-3 gap-3'>
              <label htmlFor='pass' className='uppercase font-bold text-slate-600'>
                Current Password
              </label>
              <input
                type='password'
                placeholder=''
                className='text-lg rounded-md border-slate-300 bg-slate-50 usm:text-base'
                name='pass'
                id='pass'
                required
                value={password.currentPassword || ''}
                onChange={(e) => {
                  setPassword({ ...password, currentPassword: e.target.value });
                }}
              />
              <label htmlFor='npass' className='uppercase font-bold text-slate-600'>
                New Password
              </label>
              <input
                type='password'
                className='text-lg rounded-md border-slate-300 bg-slate-50 usm:text-base'
                name='npass'
                id='npass'
                value={password.newPassword || ''}
                onChange={(e) => {
                  setPassword({ ...password, newPassword: e.target.value });
                }}
              />
              <label htmlFor='rnpass' className='uppercase font-bold text-slate-600'>
                Repeat new password
              </label>
              <input
                type='password'
                className='text-lg rounded-md border-slate-300 bg-slate-50 usm:text-base'
                name='rnpass'
                id='rnpass'
                value={password.repPassword || ''}
                onChange={(e) => {
                  setPassword({ ...password, repPassword: e.target.value });
                }}
              />
            </div>
            <input
              type='submit'
              value='Change Password'
              disabled={
                [
                  password.currentPassword,
                  password.newPassword,
                  password.repPassword
                ].includes('')
              }
              className='bg-indigo-700 hover:bg-indigo-800 disabled:bg-slate-400 disabled:hover:bg-slate-400 hover:cursor-pointer disabled:hover:cursor-default  transition-colors px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
