import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Confirm from './pages/Confirm'
import ChangePassword from './pages/ChangePassword'
import NewPassword from './pages/NewPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='confirm/:id' element={<Confirm />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='change-password/:token' element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
