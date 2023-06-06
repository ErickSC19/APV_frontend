import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import ProtectedLayout from './layout/ProtectedLayout'

import Login from './pages/Login'
import Register from './pages/Register'
import Confirm from './pages/Confirm'
import ChangePassword from './pages/ChangePassword'
import NewPassword from './pages/NewPassword'
import AdminPatients from './pages/AdminPatients'

import {AuthProvider} from './context/AuthProvider'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='confirm/:id' element={<Confirm />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='change-password/:token' element={<NewPassword />} />
        </Route>

        <Route path="/admin" element={<ProtectedLayout/>}>
            <Route index element={<AdminPatients/>}></Route>
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
