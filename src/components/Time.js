import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Time.css";
const Time = ({ timer }) => {
  const [date, setDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const SECONDS_IN_A_DAY = 86400;
    const SECONDS_IN_AN_HOUR = 3600;
    const SECONDS_IN_A_MINUTE = 60;

    // Calculate days
    const days = Math.floor(timer / SECONDS_IN_A_DAY);
    const remainingSecondsAfterDays = timer % SECONDS_IN_A_DAY;

    // Calculate hours
    const hours = Math.floor(remainingSecondsAfterDays / SECONDS_IN_AN_HOUR);
    const remainingSecondsAfterHours =
      remainingSecondsAfterDays % SECONDS_IN_AN_HOUR;

    // Calculate minutes
    const minutes = Math.floor(
      remainingSecondsAfterHours / SECONDS_IN_A_MINUTE
    );

    // Remaining seconds
    const remainingSeconds = remainingSecondsAfterHours % SECONDS_IN_A_MINUTE;

    setDate({
      days,
      hours,
      minutes,
      seconds: remainingSeconds,
    });
  }, [timer]);

  return (
    <div className="cards">
      {["Days", "Hours", "Minutes", "Seconds"].map((item) => (
        <Card number={date[item.toLowerCase()]} type={item} key={item} />
      ))}
    </div>
  );
};

export default Time;
