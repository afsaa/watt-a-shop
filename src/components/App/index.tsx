import * as React from 'react';
import { useEffect } from 'react';
import { checkMode } from '../../utils';

function App(): JSX.Element {
  useEffect(() => {
    checkMode();
    return () => {};
  }, []);

  const toggleDarkMode = () => {
    localStorage.theme = 'dark';
    checkMode();
  };

  const toggleLightMode = () => {
    localStorage.theme = 'light';
    checkMode();
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl dark:text-white">Hello Vite</h1>
      <div className="w-full h-20 flex gap-4">
        <button className="w-32 h-auto p-4 flex justify-center items-center text-center dark:text-black text-white dark:bg-white bg-black" onClick={() => toggleDarkMode()}>
          Dark mode
        </button>
        <button className="w-32 h-auto p-4 flex justify-center items-center text-center dark:text-black text-white dark:bg-white bg-black" onClick={() => toggleLightMode()}>
          Light mode
        </button>
      </div>
    </div>
  );
}

export default App;
