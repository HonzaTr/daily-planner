

import React, { useEffect, useState } from 'react'
import { ToDo } from './ToDo';
import { AddToDo } from './AddToDo';

export const API_URL = "https://68aa0f3b909a5835049b8c97.mockapi.io/ToDos"; 

function ToDoList() { 

  const [toDos, setToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHide, setIsHide] = useState(true);

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
  }

  const handleHideForm = () => {

    setIsHide((prev)=>!prev);
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
            {toDos.map((item)=> <ToDo key={item.id} task={item} />)}
        </ul>
        <div>
            {isHide&&<button onClick={handleHideForm}>Přidej nový úkol</button>}
        </div>
        {!isHide&&<AddToDo addTask={handleAddTask} hideForm={handleHideForm}/>}
    </>
  )
}

export {ToDoList}

