import { useState } from 'react';
import PatientList from '../components/PatientList';
import PatientForm from '../components/PatientForm';

const AdminPatients = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className='flex flex-col md:flex-row md:justify-center md:gap-8'>
      <button type='button' className='md:hidden bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md' onClick={() => setShowForm(!showForm)}>
        {showForm ? '-' : '+'}
      </button>
      <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <PatientForm />
      </div>
      <div className='md:w-1/2 lg:w-2/5'>
        <PatientList />
      </div>
    </div>
  );
};

export default AdminPatients;
