import { useEffect } from 'react';

import { Board } from 'components/Board';
import { useGame } from 'hooks/useGame';
import { useDebouncedCallback } from 'hooks/useDebouncedCallback';
import { ANIMATION_DURATION } from 'utils/constants';

const Game = () => {
  const { tiles, moves } = useGame();

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

  useEffect(() => {
    window.addEventListener('keydown', debouncedHandler);

    return () => {
      window.removeEventListener('keydown', debouncedHandler);
    };
  }, [debouncedHandler]);

  return (
    <div>
      <h1>2048 Game</h1>
      <Board tiles={tiles} />
    </div>
  );
};

export { Game };
