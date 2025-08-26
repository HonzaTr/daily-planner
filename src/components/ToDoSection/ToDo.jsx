
import React from 'react'
import { useState } from 'react';
import { API_URL } from './ToDoList';

function ToDo({task, deleteTask, completeTask}) {


  const deadlineState = (deadline)=> {

    const actualDay = new Date().getDate();             
    const actualMonth = new Date().getMonth();
    const actualYear = new Date().getFullYear();

    const today = new Date(actualYear, actualMonth, actualDay); //actual day with time 00:00:00

    const utcDeadline = new Date(deadline);

    const d = utcDeadline.getDate();
    const m = utcDeadline.getMonth();
    const y = utcDeadline.getFullYear();

    const deadlineDay = new Date(y, m, d); // deadline day with time 00:00:00

    const dayMiliseconds = 1000 * 60 * 60 * 24;  //miliseconds of the day

    const result = Math.floor((deadlineDay - today) / dayMiliseconds);
    
    if(result < 0){
      return <span className="deadline deadline--over">Po termínu</span>
    } else if(result === 0){
      return <span className="deadline deadline--today">Dnes</span>
    }
    else if(result === 1){
      return <span className="deadline deadline--tomorrow">Zítra</span>
    }else{

      return null;
    }
  }


  const parseDeadline = () => {

    const date = task.deadline.split("-");

    return(`${date[2]}.${date[1]}.${date[0]}`);

  }


    return (
    <div className={task.completed?"todo-item todo-item-complete":"todo-item"}>
        <li><h4>{task.title}</h4>
        {!task.completed && <p>Deadline: {parseDeadline()} {deadlineState(task.deadline)}</p>}
        </li>
        <div className='todo-buttons'>
          <button className="todo-btn-state todo-btn" onClick={() => completeTask(task)}>{task.completed?"Obnovit":"Hotovo"}</button>
          <button className="todo-btn-delete todo-btn" onClick={() => deleteTask(task.id)}>Smazat</button>
        </div>
    </div>
  )
}

export {ToDo}