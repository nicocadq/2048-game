import { useState } from 'react';

import { Game } from 'components/Game';

import './App.css';

const App = () => {
  const [gameKey, setGameKey] = useState(new Date().toISOString());

  const onReset = () => setGameKey(new Date().toISOString());

  return (
    <div>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <Game key={gameKey} />
    </div>
  );
};

export default App;
