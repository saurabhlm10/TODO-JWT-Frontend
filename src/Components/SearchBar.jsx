import { useState } from 'react'
import { useNavigate } from 'react-router'


const SearchBar = ({ searchTodos, setSearchTodos }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()



  return (
    <div id='searchbar'>
      <form action="">
        <input type="text" placeholder='Search Todos'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button id='search-button' type='button'
          onClick={() => {
            if (!searchTerm) return
            setSearchTodos(true)
            navigate(`/search/:${searchTerm}`)
            setSearchTerm('')
          }
          }
        >Search</button>
      </form>
    </div>
  )
}

export default SearchBar