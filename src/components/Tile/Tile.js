import { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { usePreviousProps } from 'hooks/usePreviousProps';
import { TILES_COUNT, CONTAINER_WIDTH } from 'utils/constants';

import { Container } from './Tile.styles';

const Tile = ({ id, position, value }) => {
  const [scale, setScale] = useState(1);

  const previousValue = usePreviousProps(value);

  // TODO: throw and error if its out, the snippet below should help
  // const withinBoardBoundaries =
  //   position[0] < TILES_COUNT && position[1] < TILES_COUNT;

  const isNew = previousValue === undefined;
  const hasChanged = previousValue !== value;
  const mustHighlight = isNew || hasChanged;

  const getPixelsOfPosition = useCallback(
    (p) => (p / TILES_COUNT) * CONTAINER_WIDTH,
    []
  );

  useEffect(() => {
    if (mustHighlight) {
      setScale(1.1);
      setTimeout(() => setScale(1), 100);
    }
  }, [mustHighlight, scale]);

  return (
    <Container
      top={getPixelsOfPosition(position[1])}
      left={getPixelsOfPosition(position[0])}
      scale={scale}
      index={id}
    >
      {value}
    </Container>
  );
};

Tile.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
};

export { Tile };
