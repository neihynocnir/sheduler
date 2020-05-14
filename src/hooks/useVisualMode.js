import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [abc, setAbc] = useState([initial]);

  const transition = (mode, replace = false) => {
    setAbc(abc)
    return transition
  }


  return { mode, transition }
};
export default useVisualMode;
