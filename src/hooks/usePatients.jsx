import { useContext } from 'react';
import { PatientsContext } from '../context/PatientProvider';

const usePatients = () => {
  return useContext(PatientsContext);
};

export default usePatients;
