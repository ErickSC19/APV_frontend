import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedLayout = () => {

    const { auth, loadingA } = useAuth()

    if (loadingA) return console.log('loading');
    return (
        <>
            <div>ProtectedLayout</div>
            {auth?.id ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default ProtectedLayout