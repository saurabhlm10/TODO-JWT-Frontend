import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import Cookies from 'universal-cookie'

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const cookies = new Cookies()

  const handleRegister = async () => {
    if (!(firstName && lastName && email && password)) {
      return alert('All Fields Are Required')
    }

    try {
      const config = {
        firstName,
        lastName,
        email,
        password
      }

      const res = await axios.post('/auth/register', config)

      const token = res.data.token
      const userId = res.data._id

      cookies.set('jwt_token', token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
      })
      cookies.set('userId', userId, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
      })

      setIsLoggedIn(true)

      navigate('/')

    } catch (error) {
      if (error.message === 'Request failed with status code 402') {
        return alert('User Already Exists')
      }
    }

  }
  return (
    <div id='register-container'>
      <h2>Register</h2>
      <h3>Have An Account? {
        <Link to='/login'>Login</Link>
      }</h3>
      <div>
        <input className='register-input' type="text" name='firstname' placeholder='First Name' value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <input className='register-input' type="text" name='email' placeholder='Last Name' value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <input className='register-input' type="text" name='email' placeholder='Email' value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input className='register-input' type="password" name='password' placeholder='Password' value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </div>
      <button className='register-button' type="button" onClick={() => { handleRegister() }}>Register</button>
    </div>
  )
}

export default Register
