
import React from 'react'
import { useState } from 'react';
import { API_URL } from './TodoList';

function ToDo({task, deleteTask, completeTask}) {

    return (
    <div>
        <li>{task.title} {task.completed ? "✅" : "❌"}</li>
        <button onClick={() => completeTask(task)}>{task.completed?"Obnovit":"Hotovo"}</button>
        <button onClick={() => deleteTask(task.id)}>Smazat</button>
    </div>
  )
}

export {ToDo}