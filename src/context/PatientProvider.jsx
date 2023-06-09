import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';

const PatientsContext = createContext();

const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token');
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

  const setPatientToEdit = (patient) => {
    setSelectedPatient(patient);
  };

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await axiosClient('/patients', config);
        setPatients(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    getPatients();
  }, []);
  return (
    <PatientsContext.Provider
      value={{ patients, addPatient, setToEdit: setPatientToEdit, selectedPatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContext, PatientProvider };
