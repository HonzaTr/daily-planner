
import React, { useEffect, useState } from 'react'
import sound from "../../assets/sound.mp3"

const WORK_TIME = 10;
const SHORT_BREAK = 5;
const LONG_BREAK = 8;

function Timer() {

    const [time, setTime] = useState(WORK_TIME);
    const [cycle, setCycle] = useState(1);
    const [phase, setPhase] = useState("");

    const [isBreak, setIsBreak] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    
    useEffect(()=>{
        
    if(!isRunning){
        return;
    }
    
    if(time === 0 && !isBreak){

        playSound();

        if(cycle === 4){                    //kontrola počtů cyklů => pokud uběhne 4. cyklus, tak se nastavuje delší pauza
            setTime(LONG_BREAK);
            setIsBreak(true);
            setIsRunning(false);
            setCycle(1);                
            return
        }
            
        setTime(SHORT_BREAK);               
        setIsBreak(true);
        setIsRunning(false);
        setCycle(prev => prev + 1);
        return;
    }

    if(time === 0 && isBreak){
            
            playSound();
            setTime(WORK_TIME);
            setIsBreak(false);
            setIsRunning(false);
            return;
    }

    const id = setTimeout(()=>{

        setTime(prev => prev-1);
    
        }, 1000) 
     

    return () => {

        clearTimeout(id);
    }

    }, [time, isRunning])

const playSound = () => {

    const cink = new Audio(sound);

    cink.play();
}

const getMinutes = (time) => {

    const minutes = Math.floor(time/60);

    return minutes < 10 ? `0${minutes}` : `${minutes}`;

}

const getSeconds = (time) => {

    const seconds = Math.floor(time%60);

    return seconds < 10 ? `0${seconds}` : `${seconds}`;
}

const handleStart = () => {

    setIsRunning(true);

}

const handlePause = () => {

    setIsRunning(false);
}

const handleReset = () => {

    if(isRunning) return

    setTime(WORK_TIME);
    setCycle(1);
}
    
    

  return (
    <section className="timer">
        <header className="timer-header">
            <h2>Časovač</h2>
            <p>Probíhající fáze: <span>{phase}</span></p>

        </header>
        <div className="timer-body">
            <div className="timer-time">
                <p>{getMinutes(time)}:{getSeconds(time)}</p>
            </div>
            <div className="timer-btns">
                <button className="timer-btn start-btn" onClick={() => handleStart()}>Start</button>
                <button className="timer-btn stop-btn" onClick={() => handlePause()}>Stop</button>
                <button className="timer-btn reset-btn" onClick={() => handleReset()}>Reset</button>
            </div>
        </div>

    </section>
  )
}

export {Timer}