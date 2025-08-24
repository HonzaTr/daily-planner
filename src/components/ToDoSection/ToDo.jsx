
import React from 'react'
import { useState } from 'react';

const API_URL = "https://68aa0f3b909a5835049b8c97.mockapi.io/ToDos";

function ToDo({toDo}) {
  
    const [isCheck, setIsCheck] = useState(toDo.complete);


    const handleComplete = () => {

        setIsCheck(prev => !prev);

        fetch(`${API_URL}/${toDo.id}`, {
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                
                ...toDo,
                complete: !isCheck
                          
                })
            })
            .then((response)=>{
                if(!response.ok) throw new Error("Server error")
                response.json();
            })
    }

    

    return (
    <div>
        <li>{toDo.title} {isCheck ? "✅" : "❌"}</li>
        <button onClick={()=>handleComplete()}>Check</button>
    </div>
  )
}

export {ToDo}