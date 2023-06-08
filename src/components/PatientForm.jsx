import { useState } from 'react';
import Alert from '../components/Alert';
import usePatients from '../hooks/usePatients';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(Date.now());
  const [syntoms, setSyntoms] = useState('');

  const [alert, setAlert] = useState({});
  const { savePatient } = usePatients();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      savePatient({ name, owner, email, date, syntoms });
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <p className='text-xl text-center mb-10 font-semibold'>
        Add patients to{' '}<span className='text-indigo-600 font-bold'>manage</span>
      </p>

      <form id='form' onSubmit={handleSubmit} className='bg-white py-10 px-5 nb-10 lg:mb-0 shadow-md rounded-md'>
        <div className='mb-5'>
          <label htmlFor='pet' className='text-gray-700 uppercase font-bold'>pet</label>
          <input id='pet' type='text' required placeholder="Pet's name" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        <div className='mb-5'>
          <label htmlFor='owner' className='text-gray-700 uppercase font-bold'>pet's owner</label>
          <input id='owner' type='text' required placeholder="Owner's name" value={owner} onChange={(e) => setOwner(e.target.value)} className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Email</label>
          <input id='email' type='email' required placeholder="Owner's email" value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        <div className='mb-5'>
          <label htmlFor='date' className='text-gray-700 uppercase font-bold'>discharge date</label>
          <input id='date' type='date' required value={date} onChange={(e) => setDate(e.target.value)} className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        <div className='mb-5'>
          <label htmlFor='syntoms' className='text-gray-700 uppercase font-bold'>syntoms</label>
          <textarea id='syntoms' required placeholder="Pet's syntoms" form='form' rows='4' value={syntoms} onChange={(e) => setSyntoms(e.target.value)} className='border-2 resize-none border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
        </div>
        {msg && <Alert alert={alert} />}
        <input type='submit' value='Add Patient' className='bg-indigo-600 text-white w-full p-3 rounded-md uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors' />
      </form>
    </>
  );
};

export default PatientForm;
