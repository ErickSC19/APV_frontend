import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    
    const [alert, setAlert] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();

        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({msg: 'Missing values', error: true})
            return;
        }

        if(password!==repeatPassword) {
            setAlert({msg: 'Passwords are not equal', error: true})
            return;
        }

        if (password.length < 6) {
            setAlert({msg: 'Password is to short, six characters minimum', error: true})
            return;
        }

        setAlert({});

        //Create on API

        try {
            
            await axiosClient.post('/veterinarians', { name, email, password})

            setAlert({
                msg: 'Succesful registration, check your email',
                error: false
            })
        } catch (error) {
            
            setAlert({
                msg: error.message,
                error: true
            })
        }
    }

    const { msg } = alert

    return (
        <>
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Create an account and organize your {" "}<span className='text-black'>Patients</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                { msg && <Alert 
                alert={alert}
                />}
                <form
                onSubmit={handleSubmit}
                >
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder='your name here'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder='email@email.com'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder='password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >
                            Repeat Password
                        </label>
                        <input
                            type="password"
                            placeholder='password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            value={repeatPassword}
                            onChange={e => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'

                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link
                        className='block text-center my-5 text-gray-500'
                        to="/">
                        If you already have an account you can log in <span className='text-indigo-400 underline'>here</span>
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Register