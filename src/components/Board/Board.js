import PropTypes from 'prop-types';

import { Grid } from 'components/Grid';
import { Tile } from 'components/Tile';

import { BoardContainer, TilesContainer } from './Board.styles';

const Board = ({ tiles }) => {
  return (
    <BoardContainer>
      <TilesContainer>
        {tiles.map(({ id, position, value }) => (
          <Tile key={`tile-${id}`} id={id} position={position} value={value} />
        ))}
        <Grid />
      </TilesContainer>
    </BoardContainer>
  );
};

Board.propTypes = {
  tiles: PropTypes.array.isRequired,
};

export { Board };
