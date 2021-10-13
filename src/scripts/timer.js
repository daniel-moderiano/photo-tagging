// Timer module that combines setInterval and Date API to give a reasonably accurate timer on UI
function Timer() {
  let elapsed = '0.0';
  let running = false;

  // Run set interval function every 100 ms
  const begin = () => {
    running = true;
    const start = new Date().getTime();
    const runningTimer = setInterval(() => {
      // Reset the current time using the Date API and fixed start variable, rather than relying on accurate 100ms intervals with the setInterval function
      const time = new Date().getTime() - start;
  
      // Adjust elapsed time on each loop
      elapsed = Math.floor(time / 100) / 10;
      if (Math.round(elapsed) == elapsed) {
        elapsed += '.0';
      }
  
      // Set necessary DOM element with UI timer here
      document.querySelector('.timer').textContent = elapsed;
    }, 100);
    return runningTimer;
  }

  // Stops timer
  const end = (interval) => {
    clearInterval(interval);
  };

  // This may not be entirely accurate due to the asynchronous nature of JS, but it should be close. And importantly, should be accurate in the most common use case: after the timer has been stopped
  const getCurrentTime = () => elapsed;

  // Determine if the timer is currently running
  const isRunning = () => running;

  return {
    begin,
    end,
    getCurrentTime,
    isRunning,
  }
}

export default Timer;

