import React from 'react';
import Game from './components/game'
import { GameProvider } from './components/GameContext';

export const AppContext = React.createContext(); 

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>   
  );
}

export default App;