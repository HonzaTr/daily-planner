
import React from 'react'
import { useState } from 'react';
import { API_URL } from './TodoList';

function ToDo({task, deleteTask}) {
  
    const [isCheck, setIsCheck] = useState(task.completed);


    const handleComplete = () => {

        setIsCheck(prev => !prev);

        fetch(`${API_URL}/${task.id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                
                ...task,
                completed: !isCheck
                          
                })
            })
            .then((response)=>{
                if(!response.ok) throw new Error("Server error")
                response.json();
            })
    }

    return (
    <div>
        <li>{task.title} {isCheck ? "✅" : "❌"}</li>
        <button onClick={handleComplete}>{isCheck?"Obnovit":"Hotovo"}</button>
        <button onClick={() => deleteTask(task.id)}>Smazat</button>
    </div>
  )
}

export {ToDo}