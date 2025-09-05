

import React, { useEffect, useState } from 'react'
import { ToDo } from './ToDo';
import { AddToDo } from './AddToDo';

export const API_URL = "https://68aa0f3b909a5835049b8c97.mockapi.io/ToDos"; 

function ToDoList() { 

  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date);

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

  const sortToDo = () => {

    const sortedItems = [...toDos];

    sortedItems.sort((a, b) => {

    return new Date(a.deadline) - new Date(b.deadline);
    
    })

    return sortedItems;
  }



  if(error){
    return <p>{error}</p>
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  return (
    <div>
      <section className="todo-list">
          <header className="todo-list-header">
              <h2>Úkoly</h2>
              <div className="todo-list-buttons">
                <button className="todo-list-btn btn-complete" onClick={handleChangeList}>{isComplete?"Aktivní úkoly":"Hotové úkoly"}</button>
                <button className="todo-list-btn btn-add" onClick={handleHideForm}>+ Přidat úkol</button>
              </div>
          </header>
          <ul className="todo-list-ul">
              {isComplete?
                  toDos.filter((item)=>(item.completed)).map((item) => <ToDo 
                                                                        key={item.id}
                                                                        task={item}
                                                                        deleteTask={handleDeleteTask}
                                                                        completeTask={handleCompleteTask}
                                                                        />)
                  :
                  sortToDo().filter((item)=>(!item.completed)).map((item) => <ToDo
                                                                        key={item.id}
                                                                        task={item}
                                                                        deleteTask={handleDeleteTask}
                                                                        completeTask={handleCompleteTask}
                                                                        />)
              }
          </ul> 
      </section>     
      {!isHide && <AddToDo addTask={handleAddTask} hideForm={handleHideForm}/>}
      </div>
  )
}

export {ToDoList}
