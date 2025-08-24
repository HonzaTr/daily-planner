

import React, { useEffect, useState } from 'react'
import { ToDo } from './ToDo';
import { AddToDo } from './AddToDo';

export const API_URL = "https://68aa0f3b909a5835049b8c97.mockapi.io/ToDos"; 

function ToDoList() { 

  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isHide, setIsHide] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(()=>{

    fetch(API_URL)
        .then((response) => {

            if(!response.ok) throw new Error("Server Error")
            return response.json();
        })
        .then((data) => setToDos(data))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false))


  }, [])

  const handleAddTask = (toDo) => {

    setToDos(prev => [...prev, toDo]);
    setIsComplete(false);
  }

  const handleDeleteTask = (id) => {

    fetch(`${API_URL}/${id}`,{
        method: "DELETE",
    })
    .then((response) => {
        if(response.ok){
            
            setToDos((prev)=>prev.filter((item)=>{

            return id !== item.id;
            }))
        }
    })
  }
    
  const handleCompleteTask = (toDo) => {

        const check = !toDo.completed;

        fetch(`${API_URL}/${toDo.id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                  
                ...toDo,
                completed: check
                            
                  })
              })
              .then((response)=>{
                  if(!response.ok) throw new Error("Server error")
                  return response.json();
              })
              .then((updated) => setToDos((prev) => prev.map((item) => (item.id === updated.id ? updated : item))))
        
      }
  

  const handleHideForm = () => {

    setIsHide((prev)=>!prev);

  }

  const handleChangeList = () => {

    setIsComplete(prev => !prev);
    
  }

  if(error){
    return <p>{error}</p>
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <>
        <ul>
            {isComplete?
                toDos.filter((item)=>(item.completed)).map((item) => <ToDo 
                                                                        key={item.id}
                                                                        task={item}
                                                                        deleteTask={handleDeleteTask}
                                                                        completeTask={handleCompleteTask}
                                                                        />)
                :
                toDos.filter((item)=>(!item.completed)).map((item) => <ToDo
                                                                        key={item.id}
                                                                        task={item}
                                                                        deleteTask={handleDeleteTask}
                                                                        completeTask={handleCompleteTask}
                                                                        />)
            }
        </ul>
        <div>
            {isHide && <button onClick={handleHideForm}>Přidej nový úkol</button>}
            <button onClick={handleChangeList}>{isComplete?"Aktivní úkoly":"Hotové úkoly"}</button>
        </div>
        {!isHide && <AddToDo addTask={handleAddTask} hideForm={handleHideForm}/>}
    </>
  )
}

export {ToDoList}
