function Timer() {
  const start = new Date().getTime();
  let elapsed = '0.0';

  // Run set interval function every 100 ms
  const begin = () => {
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

  const end = (interval) => {
    clearInterval(interval);
  };

  return {
    begin,
    end,
  }
}

export default Timer;

