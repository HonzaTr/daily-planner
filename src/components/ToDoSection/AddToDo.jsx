import React, { useState } from 'react'
import { API_URL } from './TodoList';

function AddToDo({addTask, hideForm}) {
  
  const [form, setForm] = useState({title:"", urgency:"classic"});
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    console.log("tady je hodnota title z formulare:" + form.title);
    e.preventDefault();

    fetch(API_URL, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            title: form.title,
            urgency: form.urgency,
            completed: false
        })
    })
    .then(response => response.json())
    .then(newTask => {
        addTask(newTask);
        setForm({title:"",urgency:"classic"});
    })
    .catch(err => setError(err))
    .finally(()=> hideForm())
  }
  
return (
    <form onSubmit={handleSubmit}>
        <label>
            Úkol:
            <input 
                placeholder={"Např. odeslat e-mail"}
                value={form.title} 
                onChange={(e)=>setForm((prev)=>({...prev, title:e.target.value}))}
            />
        </label>
        <label>
            Klasický úkol
            <input 
                type="radio" 
                name="urgency" 
                value="classic" 
                checked={form.urgency === "classic"} 
                onChange={(e)=>setForm((prev)=>({...prev, urgency:e.target.value}))}
            />
        </label>
        <label>
            Urgentní úkol
            <input 
                type="radio" 
                name="urgency" 
                value="urgent" 
                checked={form.urgency === "urgent"} 
                onChange={(e)=>setForm((prev)=>({...prev, urgency:e.target.value}))}
            />
        </label>
        <button>Přidat</button>
        <p style={{color: "red"}}>{error}</p>
    </form>
  )
}

export {AddToDo}