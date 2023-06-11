import { Link } from 'react-router-dom';

const AdminNav = () => {
  return (
    <nav className='flex gap-4 text-center divide-x-2 mb-auto place-self-start justify-self-start py-4'>
      <Link to='/admin/profile' className='font-bold uppercase text-slate-500 hover:text-slate-400'>
        Profile
      </Link>
      <Link
        to='/admin/new-password'
        className='font-bold uppercase text-slate-500 hover:text-slate-400'
      >
        Change Password
      </Link>
    </nav>
  );
};

export default AdminNav;
