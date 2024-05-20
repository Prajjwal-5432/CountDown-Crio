import React, { useEffect, useState } from "react";
import Time from "./Time";
import "./Timer.css";
const Timer = () => {
  const [dateTime, setDateTime] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [daysError, setDaysError] = useState(false);
  const [timerOver, setTimerOver] = useState(false);
  useEffect(() => {
    let countTimer = 0;

    if (isRunning) {
      countTimer = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    }

    return () => clearInterval(countTimer);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0 && isRunning) {
      setIsRunning(false);
      setTimerOver(true);
    }
  }, [timer, isRunning]);

  const handleStart = () => {
    setDaysError(false);
    setTimerOver(false);
    const inputDate = new Date(dateTime);
    const currentDate = new Date();

    inputDate.setSeconds(0, 0);
    currentDate.setSeconds(0, 0);

    if (currentDate > inputDate) {
      return alert("Please provide a future date");
    }

    const seconds = (inputDate - currentDate) / 1000;

    const days = Math.floor(seconds / 86400);

    if (days > 100) {
      return setDaysError(true);
    }
    if (seconds === 0) {
      return setTimerOver(true);
    }
    setTimer(seconds);
    setIsRunning(true);
  };
  const handleStop = () => {
    setIsRunning(false);
    setTimer(0);
  };
  return (
    <div className="timer-container">
      <h1 className="timer-title">Countdown Timer</h1>
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="timer-input"
      />
      <button
        onClick={() => (isRunning ? handleStop() : handleStart())}
        className="timer-button"
      >
        {isRunning ? "Cancel Timer" : "Start Timer"}
      </button>
      {daysError && (
        <p className="timer-error">Selected time is more than 100 days</p>
      )}
      {timerOver && (
        <p className="timer-success">
          The Countdown is Over! What's next on your adventure?
        </p>
      )}
      <Time timer={timer} />
    </div>
  );
};

export default Timer;
