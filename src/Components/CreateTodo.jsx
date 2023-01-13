import { useState } from 'react'
import './createtodo.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie'


const CreateTodo = () => {
  const [title, setTitle] = useState('')
  const [createdTasks, setCreatedTasks] = useState([])
  const [showAddATaskInput, setShowAddATaskInput] = useState(false)
  const [addATaskInputValue, setAddATaskInputValue] = useState('')
  const cookies = new Cookies()


  const navigate = useNavigate()


  const addATask = () => {
    if(addATaskInputValue){
      setCreatedTasks([...createdTasks, addATaskInputValue])
      setAddATaskInputValue('')
    }
    setShowAddATaskInput(false)
  }

  const removeTask= (id) => {
    const tempCreatedTasks = createdTasks.filter((task, i) => i !== id)

    setCreatedTasks(tempCreatedTasks)
  }

  const createTodo = async () => {


    if(!title || !createdTasks){
      return alert('Please Add Title and Tasks')
    }

  const token = cookies.get('jwt_token')
  const userId = cookies.get('userId')


        const config = {
            headers: {
                'token': token,
            }
        };


    const data = {
      userId: userId,
      title: title,
      tasks: [...createdTasks]
    }

    const resp = await axios.post(`/api/createtodo/${userId}`, data, config)

    navigate('/')

  }

  return (
    <>
      <div id='create-todo'>
        <input id='create-todo-title' type="text" placeholder='Add Title'
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        />
        <div id='creating-todo-tasks'>
          {createdTasks.length > 0 && createdTasks.map((task, id) => (
            <div className='created-task' key={id}>
              <p>{task}</p>
              <p className='cross-button'
              onClick={() => removeTask(id)}
              >&#10006;</p>

            </div>
          ))}
        </div>
        {showAddATaskInput &&
          <div id='add-task-container'>

            <input
              id='create-todo-task-input'
              type="text"
              placeholder='Add Task'
              value={addATaskInputValue}
              onChange={(e) => {
                setAddATaskInputValue(e.target.value)
              }}
            />
            <button
            onClick={() => addATask()}
            >Add Task</button>
          </div>
        }
        {!showAddATaskInput &&

          <button
            id='add-tasks'
            onClick={() => setShowAddATaskInput(true)}
          >Add A Task</button>
        }
        <button id='create-a-todo-button'
        onClick={createTodo}
        >Create Todo</button>
      </div>
    </>
  )
}

export default CreateTodo
