import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(1200);
  const [timer, setTimer] = useState(null);

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  const startTimer = useCallback(() => {
    if (timer) setTimer(clearInterval(timer));
    setTimer(setInterval(() => { setTime(prevValue => prevValue - 1); }, 1000));
    setStatus('work');
  });

  const stopApp = useCallback(() => {
    setStatus('off');
    setTimer(clearInterval(timer))
    setTime(1200);
  });

  const closeApp = useCallback(() => window.close());

  const timeFormat = time => new Date(time * 1000).toUTCString().split(/ /)[4];

  if (status === 'work' && time < 1) {
    playBell();
    setStatus('rest');
    setTime(20);
  }

  if (status === 'rest' && time < 1) {
    setStatus('work');
    setTime(1200);
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (<img src="./images/work.png" />)}
      {status === 'rest' && (<img src="./images/rest.png" />)}
      {status !== 'off' && (
        <div className="timer">
          {timeFormat(time)}
        </div>
      )}
      {status === 'off' && (<button onClick={startTimer} className="btn">Start</button>)}
      {status !== 'off' && (<button onClick={stopApp} className="btn">Stop</button>)}
      <button onClick={closeApp} className="btn btn-close">X</button>
    </div>
  )
}

render(<App />, document.querySelector('#app'));
