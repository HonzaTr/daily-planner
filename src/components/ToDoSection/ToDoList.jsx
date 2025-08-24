

import React, { useEffect, useState } from 'react'
import { ToDo } from './ToDo';

function ToDoList() {

const API_URL = "https://68aa0f3b909a5835049b8c97.mockapi.io/ToDos";  

  const [toDos, setToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

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

  if(error){
    return <p>{error}</p>
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <ul>
        {toDos.map((item)=> <ToDo key={item.id} toDo={item} />)}
    </ul>
  )
}

export {ToDoList}

