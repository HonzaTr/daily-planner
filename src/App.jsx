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
      <div className="app-timer-weather">
        <Timer />
        <Weather />
      </div>
    </div>
  </div>
  )
    
}

export {App}
