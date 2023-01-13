import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'
import Cookies from 'universal-cookie'


const Login = ({ isLoggedIn, setIsLoggedIn, user, setUser }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const cookies = new Cookies()


    const handleLogin = async () => {

        if (!(email && password)) {
            return alert('email and password are required')
        }

        const config = {
            email,
            password
        }

        try {
            const res = await axios.post('/auth/login', config)

            const token = res.data.token

            const userId = res.data.user._id

            setIsLoggedIn(true)

            cookies.set('jwt_token', token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
              })

            cookies.set('userId', userId, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
              })

            navigate('/')
            
        } catch (error) {
            if(error.message === 'Request failed with status code 400'){
                return alert('Email Or Password is Incorrect')
            }
        }
    }

    return (
        <div id='login-container'>
            <h2>Login</h2>
            <h3>New Here? {
                <Link to='/register'>Register</Link>
            }</h3>
            <div>
                <input className='login-input' type="text" name='email' placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input className='login-input' type="password" name='password' placeholder='Password' value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
            </div>
            <button className='login-button' type="button" onClick={() => { handleLogin() }}>Login</button>
        </div>
    )
}

export default Login
