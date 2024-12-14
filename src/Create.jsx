import axios from 'axios'
import { FaTrash } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const Create = () => {
    const inpref=useRef()
    const [task,setTask]=useState('')
    const [todos,setTodos]=useState([])


    useEffect(()=>{
        axios.get('http://localhost:3000/get')
        .then(result=>setTodos(result.data))
        .catch(err=>console.log(err))
    })

    const handleadd=()=>{
         axios.post('http://localhost:3000/add',{task:task})
         .then(result=>console.log(result.data))
         .catch(err=>console.log(err))
         document.getElementById('taskk').value=''
         inpref.current.focus()
    }
    const handledelete=(id)=>{
        axios.delete('http://localhost:3000/delete/'+id)
    }
    const handleedit=(id)=>{
        axios.put('http://localhost:3000/edit/'+id)
    }
    
  return (
    <div className='todo-container'>
    <h1 className='todo-header'>To-Do List</h1>
    <div className='todo-input-container'>
        <input 
            className='todo-input' 
            ref={inpref} 
            value={task} 
            type='text' 
            placeholder='Enter a new task...' 
            onChange={(e) => setTask(e.target.value)}
        />
        <button className='todo-add-btn' onClick={handleadd}>Add</button>
    </div>

    <ul className='todo-list'>
        {todos.map(todo => (
            <li key={todo._id} className='todo-item'>
                <div className='todo-item-content'>
                    <input 
                        type='checkbox' 
                        className='todo-checkbox' 
                        onClick={() => handleedit(todo._id)} 
                    />
                    <p className='todo-task'>{todo.task}</p>
                    <FaTrash 
                        className='todo-delete-icon' 
                        onClick={() => handledelete(todo._id)} 
                    />
                </div>
            </li>
        ))}
    </ul>
</div>
  )
}

export default Create
