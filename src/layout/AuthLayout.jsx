import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const AuthLayout = () => {
  // const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user?.email) {
      // setTimeout(() => {
      window.location.reload(false);
      // }, 10);
    }
  }, [user]);

  if (loading) {
    return <main>loading</main>;
  }
  return (
    <>
      <main className='container mx-auto md:grid md:grid-cols-2 h-screen gap-12 p-5 items-center'>
        {user?.email ? <Navigate to='/admin' /> : <Outlet />}
      </main>
    </>
  );
};

export default AuthLayout;
