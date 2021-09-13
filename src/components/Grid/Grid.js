import { Children } from 'react';

import { TILES_COUNT } from 'utils/constants';

import { GridContainer, Cell } from './Grid.styles';

const Grid = () => {
  const length = TILES_COUNT * TILES_COUNT;
  const cells = new Array(length).fill(0);

  return (
    <GridContainer>
      {Children.toArray(cells.map((_) => <Cell />))}
    </GridContainer>
  );
};

export { Grid };
