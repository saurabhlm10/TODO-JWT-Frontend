import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import Modal from './Modal'
import './Todo.css'
import Cookies from 'universal-cookie'

const Todo = () => {
    const { todoId } = useParams()
    const [todo, setTodo] = useState({})

    const [tempText, setTempText] = useState('')

    const [isTitleInEditMode, setIsTitleInEditMode] = useState(false)
    const [isTaskInEditMode, setIsTaskInEditMode] = useState(null)
    const [showAddATaskInput, setShowAddATaskInput] = useState(false)
    const [addATaskInputValue, setAddATaskInputValue] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const cookies = new Cookies()

    const newtodoId = todoId.slice(1)
    
    const token = cookies.get('jwt_token')

    const config = {
        headers: {
            'token': token,
        }
    };

    const fetchTodo = async () => {
        const newtodoId = todoId.slice(1)
        const userId = cookies.get('userId')

        const resp = await axios.get(`/api/gettodo/${userId}/${newtodoId}`, config)

        const data = resp.data.todo

        setTodo(data)
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    const checkOffTask = (id) => {
        const newtodoId = todoId.slice(1)


        const tempTasks = todo.tasks.filter((task, i) => i !== id)

        const tempTodo = {
            title: todo.title,
            tasks: [...tempTasks]
        }

        setTodo(tempTodo)

        const resp = axios.put(`/api/edittodo/${newtodoId}`, tempTodo, config)
    }

    const confirmChange = async () => {
        const newtodoId = todoId.slice(1)
        const tempTodo = {
            ...todo,
            title: tempText,
        }
        setTodo(tempTodo)

        const resp = await axios.put(`/edittodo/${newtodoId}`, tempTodo, config)

        setIsTitleInEditMode(false)
    }

    const confirmTaskChange = async (id) => {
        const newtodoId = todoId.slice(1)

        const tempTasks = [...todo.tasks]

        tempTasks[id] = tempText

        const tempTodo = {
            ...todo,
            tasks: [...tempTasks],
        }

        setTodo(tempTodo)

        const resp = await axios.put(`/api/edittodo/${newtodoId}`, tempTodo, config)

        setIsTaskInEditMode(null)
    }

    const addATask = async () => {
        const newtodoId = todoId.slice(1)

        const tempTasks = [...todo.tasks]

        tempTasks.push(addATaskInputValue)

        const tempTodo = {
            ...todo,
            tasks: [...tempTasks],
        }

        setTodo(tempTodo)

        const resp = await axios.put(`/api/edittodo/${newtodoId}`, tempTodo, config)

        setAddATaskInputValue('')
        setShowAddATaskInput(false)
    }


    return (

        <div className='todo'>
            {isModalOpen && <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newtodoId={newtodoId} />}
            <div className='todo-header'>
                {isTitleInEditMode ? (
                    <div className='edit-input-field'>
                        <input
                            autoFocus
                            type='text'
                            value={tempText}
                            onChange={(e) => setTempText(e.target.value)}
                        />
                        <button
                            className='confirm-edit'
                            onClick={() => {
                                confirmChange()
                                // setTempText(todo.title)
                            }}
                        >confirm</button>
                        <button
                            className='cancel-edit'
                            onClick={() => setIsTitleInEditMode(false)}>cancel</button>
                    </div>
                ) : (
                    <>
                        <p
                            style={{ outline: 'none', width: '100%' }}
                            onClick={() => {
                                setIsTitleInEditMode(true)
                                setTempText(`${todo?.title}`)
                            }
                            }
                        >
                            {todo.title}
                        </p>
                        <p
                            onClick={() => setIsModalOpen(true)}
                        >✓</p>
                    </>

                )
                }

            </div>
            {
                todo?.tasks?.map((task, id) => (
                    <div className='task' key={id}>
                        {isTaskInEditMode === id ? (
                            <>
                                <div className='edit-task'>
                                    <input
                                        autoFocus
                                        type='text'
                                        value={tempText}
                                        onChange={(e) => setTempText(e.target.value)}
                                    />
                                    <button
                                        className='confirm-edit'
                                        onClick={() => {
                                            confirmTaskChange(id)
                                        }}
                                    >confirm</button>
                                    <button
                                        className='cancel-edit'
                                        onClick={() => setIsTaskInEditMode(null)}>cancel</button>
                                </div>
                            </>
                        ) : (

                            <>
                                <p
                                    onClick={() => {
                                        setIsTaskInEditMode(id)
                                        setTempText(`${task}`)
                                    }
                                    }
                                >{task}</p>
                                <p className='check-button'
                                    onClick={() => checkOffTask(id)}
                                >✓</p>
                            </>
                        )
                        }

                    </div>

                ))
            }
            {showAddATaskInput ? (
                <div className='add-a-task'>

                    <input
                        autoFocus
                        className='create-todo-task-input'
                        type="text"
                        placeholder='Add Task'
                        value={addATaskInputValue}
                        onChange={(e) => {
                            setAddATaskInputValue(e.target.value)
                        }}  
                    />
                    <button
                        className='confirm-add-task'
                        onClick={() => addATask()}

                    >Add Task</button>
                    <button
                        className='cancel-add-task'
                        onClick={() => setShowAddATaskInput(false)}

                    >Cancel</button>
                </div>
            ) : (
                <button
                    onClick={() => setShowAddATaskInput(true)}
                    className='add-a-task-button'
                >Add A Task</button>
            )

            }

        </div >
    )
}

export default Todo
