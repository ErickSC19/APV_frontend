import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const { closeSession } = useAuth();

  return (
    <header className='py-10 bg-indigo-600 w-full'>
      <div className='container mx-auto flex flex-col text-center lg:flex-row justify-between items-center'>
        <h1 className='font-bold text-2xl text-indigo-200'>Patient Administrator for <span className='text-white font-black'>veterinary</span></h1>
        <nav className='flex flex-col items-center lg:flex-row mt-5 lg:mt-0 gap-4'>
          <Link to='/admin' className='text-white text-lg uppercase'>Patients</Link>
          <Link to='/admin/profile' className='text-white text-lg uppercase'>Profile</Link>
          <button type='button' onClick={() => closeSession()} className='text-white text-lg uppercase'>Close Session</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
