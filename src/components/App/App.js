import { useState } from 'react';

import { Game } from 'components/Game';

import { Container, Header, Title, ResetButton } from './App.styles';

const App = () => {
  const [gameKey, setGameKey] = useState(new Date().toISOString());

  const onReset = () => setGameKey(new Date().toISOString());

  return (
    <Container>
      <Header>
        <Title>2048 Game</Title>
        <ResetButton type="button" onClick={onReset}>
          New Game
        </ResetButton>
      </Header>
      <Game key={gameKey} />
    </Container>
  );
};

export { App };
