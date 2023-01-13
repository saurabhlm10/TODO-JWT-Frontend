import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import './Navbar.css'
import Cookies from 'universal-cookie'

const Navbar = ({ searchTodos, setSearchTodos, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const cookies = new Cookies()


  const handleLogout = () => {
    cookies.remove('jwt_token')
    cookies.remove('userId')

    setIsLoggedIn(false)

    navigate('/login')

  }

  return (
    <div id='navbar'>

      <Link to='/createtodo'>
        <button id='create-todo-button'
        >Create a Todo</button>
      </Link>
      <SearchBar searchTodos={searchTodos} setSearchTodos={setSearchTodos} />
        <div id='logout-icon'
        onClick={handleLogout}
        >
          Logout
        </div>
    </div>
  )
}

export default Navbar
