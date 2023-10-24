import React from 'react';
import usePatients from '../hooks/usePatients';

const Patient = ({ patient }) => {
  const { setToEdit, deletePatient } = usePatients();
  const { email, name, owner, date, syntoms, _id } = patient;
  console.log(patient);
  const dateFormat = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(newDate);
  };
  return (
    <div className='mx-5 my-10 border-2 border-dashed px-5 py-10 rounded-md grid grid-cols-3'>
      <div className='col-span-2'>
        <p className='font-bold uppercase text-indigo-700 my-1'>Name: <span className='font-normal normal-case text-black'>{name}</span></p>
        <p className='font-bold uppercase text-indigo-700 my-1'>Owner: <span className='font-normal normal-case text-black'>{owner}</span></p>
        <p className='font-bold uppercase text-indigo-700 my-1'>Email: <span className='font-normal normal-case text-black'>{email}</span></p>
        <p className='font-bold uppercase text-indigo-700 my-1'>Discharge date: <span className='font-normal normal-case text-black'>{dateFormat(date)}</span></p>
        <p className='font-bold uppercase text-indigo-700 my-1'>Syntoms: <span className='font-normal normal-case text-black'>{syntoms}</span></p>
      </div>
      <div className='flex flex-col justify-between'>
        <button type='button' onClick={() => deletePatient(_id)} className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white transition-colors rounded-lg uppercase font-bold'>Delete</button>
        <button type='button' onClick={() => setToEdit(patient)} className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors rounded-lg uppercase font-bold'>Edit</button>
      </div>
    </div>
  );
};

export default Patient;
