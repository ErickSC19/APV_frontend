import {useState, useEffect, createContext} from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{
    const [loadingA, setLoadingA] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setLoadingA(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await axiosClient('/veterinarians/profile', config)

                setAuth(data)
            } catch (error) {
                console.log(error.message);
                setAuth({})
            }
            setLoadingA(false)
        }
        authUser()
    }, [])

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loadingA
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext