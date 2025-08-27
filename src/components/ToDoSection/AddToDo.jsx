import React, { useState } from 'react'
import { API_URL } from './ToDoList';

function AddToDo({addTask, hideForm}) {
  
  const [form, setForm] = useState({title:"", deadline:""});
  const [error, setError] = useState(null);


  const handleSubmit = (e) => {

    e.preventDefault();

    if(!form.title.trim() || !form.deadline){
        setError("Prosím vyplň všechny pole");
        return
    }

    fetch(API_URL, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            title: form.title,
            deadline: form.deadline,
            completed: false
        })
    })
    .then(response => response.json())
    .then(newTask => {
        addTask(newTask);
        setForm({title:"",deadline:"classic"});
    })
    .catch(err => setError(err))
    .finally(()=> hideForm())
  }

  const actualDate = () => {

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
  
return (
    <section className="add-todo">
        <header className="add-todo-header">
            <h2>Přidat úkol</h2>
        </header>
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
                Deadline:
                <input 
                    type="date" 
                    min={actualDate()}
                    value={form.deadline}
                    onChange={(e)=>setForm((prev)=>({...prev, deadline:e.target.value}))}
                />
            </label>
            <div className="form-buttons">
                <button className="form-btn form-btn--add" type="submit">Přidat</button>
                <button className="form-btn form-btn--close" type="button" onClick={hideForm}>Zavřít</button>
            </div>
        </form>
            <p style={{color: "red", display: "block"}}>{error}</p>
    </section>
  )
}

export {AddToDo}