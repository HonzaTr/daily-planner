
import React from 'react'
import { useState } from 'react';
import { API_URL } from './TodoList';

function ToDo({task, deleteTask, completeTask}) {

    return (
    <div className="todo-item">
        <li><h4>{task.title} {task.completed ? "✅" : "❌"}</h4>
            <p>Deadline: {task.deadline}</p>
        </li>
        <div className='todo-buttons'>
          <button className="todo-btn-state todo-btn" onClick={() => completeTask(task)}>{task.completed?"Obnovit":"Hotovo"}</button>
          <button className="todo-btn-delete todo-btn" onClick={() => deleteTask(task.id)}>Smazat</button>
        </div>
    </div>
  )
}

export {ToDo}