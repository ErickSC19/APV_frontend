import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';

const PatientsContext = createContext();

const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('hydmot_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const addPatient = async (patient) => {
    try {
      const { data } = await axiosClient.post('/patients', patient, config);
      const { createdAt, updatedAt, __v, ...newPatient } = data;

      setPatients([newPatient, ...patients]);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axiosClient('/patients', config);

        setPatients(data);
      } catch (error) {

      }
    };
    getPatients();
  }, []);
  return (
    <PatientsContext.Provider
      value={{ patients, addPatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContext, PatientProvider };
