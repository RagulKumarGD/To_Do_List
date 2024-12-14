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
    <div className='Container'>
        <h1>TO DO LIST</h1>
        <div className='Container-in'>
        <div className='inputs'>
        <input className='inputt' ref={inpref} id='taskk' type='text' placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)} />
        <button className='inputtbtn' onClick={handleadd}>ADD</button>
      </div>
      <div  >
        <ul style={{listStyle:'none',backgroundColor:'skyblue'}}>
            {todos.map(i=>(
                <li key={i._id}>
                   <div className='List'>
                     <input className='list-chc' type='checkbox' onClick={()=>handleedit(i._id)} />
                     <p >{i.task}</p>
                     <FaTrash style={{cursor:'pointer'}} onClick={()=>handledelete(i._id)} className='list-btn'/>
                   </div>
                </li>
            ))}
        </ul>
      </div>
        </div>
    </div>
  )
}

export default Create
