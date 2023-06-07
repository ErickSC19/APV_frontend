import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthLayout = () => {
  const { auth, loading } = useAuth();

  useEffect(() => {
    if (auth._id) {
      // setTimeout(() => {
      window.location.reload(false);
      // }, 10);
    }
  }, [auth]);

  if (loading) {
    return <main>loading</main>
  }
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-14 gap-12 p-5 items-center">
        {auth.admins?._id ? <Navigate to='/admin' /> : <Outlet />}
        
      </main>
    </>
  );
};

export default AuthLayout;
