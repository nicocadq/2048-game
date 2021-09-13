import { Board } from 'components/Board';
import { useGame } from 'hooks/useGame';
import { useDebouncedCallback } from 'hooks/useDebouncedCallback';
import { useEvent } from 'hooks/useEvent';
import { ANIMATION_DURATION } from 'utils/constants';

import { ScoreContainer } from './Game.styles';

const Game = () => {
  const { tiles, moves, score } = useGame();

  const onKeyDown = (event) => {
    event.preventDefault();

    switch (event.code) {
      case 'ArrowLeft':
        moves.left();
        break;
      case 'ArrowRight':
        moves.right();
        break;
      case 'ArrowUp':
        moves.up();
        break;
      case 'ArrowDown':
        moves.down();
        break;
      default:
        break;
    }
  };

  const debouncedHandler = useDebouncedCallback(onKeyDown, ANIMATION_DURATION);

  useEvent('keydown', debouncedHandler);

  return (
    <div>
      <ScoreContainer>Score: {score}</ScoreContainer>
      <Board tiles={tiles} />
    </div>
  );
};

export { Game };
