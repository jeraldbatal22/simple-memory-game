import { useEffect, useRef, useState } from 'react';

export const useTimeCount = () => {
  const [isStartCount, setIsStartCount] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef(null);

  // Start the timer when component mounts
  useEffect(() => {
    if (isStartCount) {
      startTimer();
    }

    // Optional: Cleanup on unmount
    return () => stopTimer();
  }, [isStartCount]);

  const startTimer = () => {
    setIsStartCount(true);
    if (timerRef.current) return; // Already running
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setSecondsElapsed(0)
    timerRef.current = null;
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const formatTime = (time) => String(time).padStart(2, '0');

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;

  return {
    minutes,
    seconds,
    formatTime,
    startTimer,
    stopTimer,
    pauseTimer,
  };
};
