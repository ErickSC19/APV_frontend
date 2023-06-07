import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const ProtectedLayout = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <main>loading</main>;
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <Header />
        {auth?.veterinarians?._id ? (<main className='container mx-auto mt-10'><Outlet /></main>) : <Navigate to='/' />}
        <Footer />
      </div>
    </>
  );
};

export default ProtectedLayout;
