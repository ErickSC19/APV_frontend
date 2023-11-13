import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import usePatients from '../hooks/usePatients';

const PatientForm = () => {
  const { addPatient, selectedPatient, setToEdit } = usePatients();
  const [currPatient, setCurrPatient] = useState({});
  const [id, setId] = useState(null);
  const [date, setDate] = useState('');

  const [alert, setAlert] = useState({});

  const changeCurr = (val) => {
    setCurrPatient((prev) => { return { ...prev, ...val }; });
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const preFormat = newDate.toISOString().split('T', 1);
    return preFormat[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log(currPatient, id);
      addPatient(currPatient, id);
      setAlert({
        msg: 'Data Saved',
        error: false
      });
      setToEdit(null);
      setCurrPatient(null);
      setId('');
      setDate('');
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
      setId(selectedPatient._id);
      setDate(formatDate(selectedPatient.date));
    }
  }, [selectedPatient]);

  const { msg } = alert;
  return (
    <>
      <h2 className='font-black text-3xl text-center'>Add a Patient</h2>
      <p className='text-xl text-center mb-10 font-semibold'>
        Then you can keep{' '}
        <span className='text-indigo-600 font-bold'>track of their state</span>
      </p>

      <form
        id='form'
        onSubmit={handleSubmit}
        className='bg-white py-10 px-5 nb-10 lg:mb-0 shadow-md rounded-md mb-6 md:mb-0'
      >
        <div className='mb-5'>
          <label htmlFor='pet' className='text-gray-700 uppercase font-bold'>
            pet
          </label>
          <input
            id='pet'
            type='text'
            required
            placeholder="Pet's name"
            value={currPatient?.name || selectedPatient?.name || ''}
            onChange={(e) => changeCurr({ name: e.target.value })}
            className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='owner' className='text-gray-700 uppercase font-bold'>
            pet's owner
          </label>
          <input
            id='owner'
            type='text'
            required
            placeholder="Owner's name"
            value={currPatient?.owner || selectedPatient?.owner || ''}
            onChange={(e) => changeCurr({ owner: e.target.value })}
            className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='text-gray-700 uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            type='email'
            required
            placeholder="Owner's email"
            value={currPatient?.email || selectedPatient?.email || ''}
            onChange={(e) => changeCurr({ email: e.target.value })}
            className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='date' className='text-gray-700 uppercase font-bold'>
            discharge date
          </label>
          <input
            id='date'
            type='date'
            required
            value={currPatient?.date ? currPatient.date : date ? formatDate(date) : ''}
            onChange={(e) => changeCurr({ date: e.target.value })}
            className='border-2 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='syntoms'
            className='text-gray-700 uppercase font-bold'
          >
            syntoms
          </label>
          <textarea
            id='syntoms'
            required
            placeholder="Pet's syntoms"
            form='form'
            rows='4'
            value={currPatient?.syntoms || selectedPatient?.syntoms || ''}
            onChange={(e) => changeCurr({ syntoms: e.target.value })}
            className='border-2 resize-none border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          />
        </div>
        {msg && <Alert alert={alert} />}
        <input
          type='submit'
          value={`${id ? 'Save Changes' : 'Add Patient'}`}
          className='bg-green-600 text-white w-full p-3 rounded-lg uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors'
        />
      </form>
    </>
  );
};

export default PatientForm;
