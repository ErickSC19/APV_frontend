import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import ProtectedLayout from './layout/ProtectedLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Confirm from './pages/Confirm';
import RequestChangePassword from './pages/RequestChangePassword';
import ChangePassword from './pages/ChangePassword';
import AdminPatients from './pages/AdminPatients';
import Profile from './pages/Profile';

import { AuthProvider } from './context/AuthProvider';
import { PatientProvider } from './context/PatientProvider';
import NewPassword from './pages/NewPassword';

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='confirm/:id' element={<Confirm />} />
              <Route path='change-password' element={<RequestChangePassword />} />
              <Route path='change-password/:token' element={<ChangePassword />} />
            </Route>
            <Route path='/admin' element={<ProtectedLayout />}>
              <Route index element={<AdminPatients />} />
              <Route path='profile' element={<Profile />} />
              <Route path='new-password' element={<NewPassword />} />

            </Route>
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
