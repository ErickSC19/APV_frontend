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

  const addPatient = async (patient, id) => {
    if (id) {
      try {
        if (Object.keys(patient).length < 3 && Object.keys(patient).length > 0) {
          const { data } = await axiosClient.patch(`/patients/${id}`, patient, config);
          const patientsUpdate = patients.map(pstate => pstate._id === data._id ? data : pstate);
          setPatients(patientsUpdate);
        } else if (Object.keys(patient).length > 3) {
          const { data } = await axiosClient.put(`/patients/${id}`, patient, config);
          const patientsUpdate = patients.map(pstate => pstate._id === data._id ? data : pstate);
          setPatients(patientsUpdate);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await axiosClient.post('/patients', patient, config);
        const { createdAt, updatedAt, __v, ...newPatient } = data;
        console.log(data);
        setPatients([newPatient, ...patients]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const deletePatient = async (id) => {
    const confirm = window.confirm('Do you want to delete this patient?');

    if (confirm) {
      try {
        await axiosClient.delete(`/patients/${id}`, config);
        const patientsUpdate = patients.filter(pstate => pstate._id !== id);
        setPatients(patientsUpdate);
      } catch (error) {
        console.log(error);
      }
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
      value={{ patients, addPatient, setToEdit: setPatientToEdit, selectedPatient, deletePatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContext, PatientProvider };
