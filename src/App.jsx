import React from 'react'
import { useState } from 'react'

import { ToDoList } from './components/ToDoSection/ToDoList'
import { Timer } from './components/Timer/Timer'




function App() {


  return (
  <div className="container">
    <div className="app-body">
      <ToDoList />
      <Timer />
    </div>
  </div>
  )
    
}

export {App}
