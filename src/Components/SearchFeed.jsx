import {useEffect} from 'react'
import { useParams } from 'react-router'
import Todos from './Todos'
import axios from 'axios'
import Cookies from 'universal-cookie'

const SearchFeed = ({todos, setTodos, searchTodos, setSearchTodos }) => {
    const {searchTerm} = useParams()
    const cookies = new Cookies()

    const token = cookies.get('jwt_token')


    const config = {
        headers: {
            'token': token,
        }
    };

    const searchTodo = async () =>{
      if(!searchTerm) return
      setSearchTodos(true)

      const userId = cookies.get('userId')

        const newSearchTerm = searchTerm.slice(1)

        const resp = await axios.get(`/api/searchtodo/${userId}/${newSearchTerm}`, config)
    
        setTodos(resp.data.searchResults)
      }

      useEffect(() => {
        searchTodo()
      }, [searchTerm])
      

  return (
    <div>
      <Todos todos={todos} setTodos={setTodos}  searchTodos={searchTodos} setSearchTodos={setSearchTodos}/>
    </div>
  )
}

export default SearchFeed
