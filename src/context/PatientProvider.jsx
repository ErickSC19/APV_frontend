import { createContext, useEffect, useState } from 'react';
import axiosClient from '../config/axios';
import useAuth from '../hooks/useAuth';

const PatientsContext = createContext();

const PatientProvider = ({ children }) => {
  const { config } = useAuth();
  const [patients, setPatients] = useState([]);

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
      value={{ patients }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export { PatientsContext, PatientProvider };
