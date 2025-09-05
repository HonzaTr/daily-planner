import React from 'react'
import { useState } from 'react'

import { ToDoList } from './components/ToDoSection/ToDoList'
import { Timer } from './components/Timer/Timer'
import { Weather } from './components/Weather/Weather'




function App() {


  return (
  <div className="container">
    <div className="app-body">
      <ToDoList />
      <Timer />
      <Weather />
    </div>
  </div>
  )
    
}

export {App}
