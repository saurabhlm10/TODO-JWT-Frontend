import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import Cookies from 'universal-cookie'


const Todos = ({ todos, setTodos, searchTodos, setSearchTodos, user, setUser }) => {

  const location = useLocation();
  const [sortCreatedAscending, setsortCreatedAscending] = useState(true)
  const [sortUpdatedAscending, setsortUpdatedAscending] = useState(false)
  const cookies = new Cookies()


  const fetchTodos = async () => {

  const token = cookies.get('jwt_token')
  const userId = cookies.get('userId')


  const config = {
    headers:{
      'token': token,
    }
  };

    const resp = await axios.get(`/api/gettodos/${userId}`, config)

    const data = resp.data.todos

    if (data.length > 0) {
      setTodos(data)
    }
  }

  useEffect(() => {
    if (location.pathname === '/') {
      fetchTodos()
    }
  }, [])

  const navigate = useNavigate()

  const sortByCreatedDate = () => {
    const tempTodos = [...todos]

    if(sortCreatedAscending){
      tempTodos.sort((a,b) => a.createdAt > b.createdAt ? -1 : 1)
    } else{
      tempTodos.sort((a,b) => a.createdAt > b.createdAt ? 1 : -1)
    }
    
    setTodos(tempTodos)
    setsortCreatedAscending(!sortCreatedAscending)
  }

  const sortByUpdatedDate = () => {
    const tempTodos = [...todos]

    if(sortUpdatedAscending){
      tempTodos.sort((a,b) => a.updatedAt > b.updatedAt ? -1 : 1)
    } else{
      tempTodos.sort((a,b) => a.updatedAt > b.updatedAt ? 1 : -1)
    }

    setTodos(tempTodos)
    setsortUpdatedAscending(!sortUpdatedAscending)
  }

  return (
    <div id='todos'>

      {todos.length > 0 ? (
        <>
          <div className='sort-btn-container'>

            <button
            className='sort-by-created-date'
            onClick={sortByCreatedDate}
            >Sort By Created Date: 
            {sortCreatedAscending ? (
              <> Oldest First</>
            ) : (
              <> Newest First</>
            )}
            </button>

            <button
            onClick={sortByUpdatedDate}
            className='sort-by-updated-date'
            >Sort By Last Updated: 
            {sortUpdatedAscending ? (
              <> Oldest First</>
            ) : (
              <> Newest First</>
            )}
            </button>
          </div>
          {
            todos.slice(0).reverse().map((todo, id) => (
              <div key={id} className='todo-header'
                onClick={() => {
                  navigate(`/:${todo._id}`)
                }}
              >
                <p>
                  {todo.title}
                </p>
              </div>
            ))}
        </>

      ) : (
        <h1>No Todos To Show</h1>
      )}
    </div>
  )
}

export default Todos