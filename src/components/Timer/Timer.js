import './Timer.css'
import React, { useState, useEffect, useRef } from 'react';
import ring from '../../sounds/ring.mp3'
const ringSound = new Audio(ring);

const Timer = () => {
    const timerInputRef = useRef();
    const [timeLeft, setTimeLeft] = useState(0);
    const [pause, setPause] = useState(true);

    useEffect(() => {
        const timerId = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(timerId);
    });

    function inputFilter() {
        const value = timerInputRef.current.value;
        setTimeLeft(value);
    }

    function startTimer() {

        let value = timerInputRef.current.value;
        if (timeLeft === 0) return;
        setPause(!pause);
        if (!pause) {
            value = timeLeft;
        }
        timeLeft === 0 ? setTimeLeft(value) : setTimeLeft(timeLeft);
    }

    function resetTimer() {
        setPause(true);
        setTimeLeft(0);
        timerInputRef.current.value = undefined;
    }

    function tick() {
        if (pause) return;
        if (timeLeft === 1) {
            ringSound.play();
            resetTimer();
        }
        setTimeLeft(timeLeft - 1);
    }

    return (
        <div className='timer'>
            <span className='timer__display'>
                {Math.floor((timeLeft / 3600)).toFixed(0).toString().padStart(2, '0')
                    + ':' + Math.floor((timeLeft % 3600 / 60)).toFixed(0).toString().padStart(2, '0')
                    + ':' + (timeLeft % 60).toString().padStart(2, '0')}</span>
            <div className='timer__container'>
                <input className='timer__input' type="number" placeholder="Seconds" name="" id="" ref={timerInputRef} onChange={inputFilter} />
                <div className='timer__buttons'>
                    <button className='timer__btn' onClick={startTimer}>{pause ? 'Start' : 'Pause'}</button>
                    <button className='timer__btn' onClick={resetTimer}>Reset</button>
                </div>
            </div>

        </div>
    );
}

export default Timer;