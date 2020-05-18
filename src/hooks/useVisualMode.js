import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, skip) => {
    if (!skip) {
      setHistory(currentHistory => [...currentHistory, mode]);
    }
    setMode(next);
  }
    
  const back = () => {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory(currentHistory => [...currentHistory.slice(0, -1)]);
    }
  }
  
  return { mode, transition, back };

};
export default useVisualMode;
