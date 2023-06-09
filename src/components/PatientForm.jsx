import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import usePatients from '../hooks/usePatients';

const PatientForm = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(Date.now());
  const [syntoms, setSyntoms] = useState('');

  const [alert, setAlert] = useState({});
  const { addPatient, selectedPatient } = usePatients();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addPatient({ name, owner, email, date, syntoms, _id: id });
      setAlert({
        msg: 'Data Saved',
        error: false
      });
      setId('');
      setName('');
      setEmail('');
      setDate('');
      setSyntoms('');
      setOwner('');
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  useEffect(() => {
    if (selectedPatient?._id) {
      const newDate = new Date(selectedPatient.date);
      const preFormat = newDate.toISOString().split('T', 1);
      const dateFormated = preFormat[0];

      console.log(dateFormated);
      setId(selectedPatient._id);
      setName(selectedPatient.name);
      setEmail(selectedPatient.email);
      setDate(dateFormated);
      setSyntoms(selectedPatient.syntoms);
      setOwner(selectedPatient.owner);
    }
  }, [selectedPatient]);

  const { msg } = alert;
  return (
    <>
      <h2 className='font-black text-3xl text-center'>Add a Patient</h2>
      <p className='text-xl text-center mb-10 font-semibold'>
        Then you can keep{' '}<span className='text-indigo-600 font-bold'>track of their state</span>
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
        <input type='submit' value={`${id ? 'Save Changes' : 'Add Patient'}`} className='bg-green-600 text-white w-full p-3 rounded-lg uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors' />
      </form>
    </>
  );
};

export default PatientForm;
