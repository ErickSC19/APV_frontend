import React from 'react';
import usePatients from '../hooks/usePatients';
import Patient from './Patient';

const PatientList = () => {
  const { patients } = usePatients();
  return (
    <>
      {patients.length
        ? (
          <>
            <h2 className='font-black text-3xl text-center'>Your Patients</h2>
            <p className='text-xl text-center mb-10 font-semibold'>Manage your patients <span className='text-indigo-600 font-bold'>and appointments</span> </p>
            {patients.map(patient => (
              <Patient
                key={patient._id}
                patient={patient}
              />
            ))}
          </>
          )
        : (
          <>
            <h2 className='font-black text-3xl text-center'>You don't have patients registered yet</h2>
            <p className='text-xl text-center mb-10 font-semibold'>Add a patient and their information <span className='text-indigo-600 font-bold'>will appear here</span> </p>
          </>
          )}
    </>
  );
};

export default PatientList;
