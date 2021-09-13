export const didTileMove = ({ origin, destination }) => {
  const hasXChanged = origin.position[0] !== destination.position[0];
  const hasYChanged = origin.position[1] !== destination.position[1];

  return hasXChanged || hasYChanged;
};

export const getIndexByPosition = (position, tilesCount) =>
  position[1] * tilesCount + position[0];

export const getPositionByIndex = (index, tilesCount) => {
  const x = index % tilesCount;
  const y = Math.floor(index / tilesCount);
  return [x, y];
};

export const getTilesIdsByRow = ({ rowIndex, tilesCount, calculateBoard }) => {
  const tilesToShow = calculateBoard();

  const tileIdsInRow = [
    tilesToShow[rowIndex + tilesCount + 0],
    tilesToShow[rowIndex * tilesCount + 1],
    tilesToShow[rowIndex * tilesCount + 2],
    tilesToShow[rowIndex * tilesCount + 3],
  ];

  return tileIdsInRow;
};

export const getTilesIdsByColumn = ({
  columnIndex,
  tilesCount,
  calculateBoard,
}) => {
  const tilesToShow = calculateBoard();

  const tileIdsInColumn = [
    tilesToShow[columnIndex + tilesCount * 0],
    tilesToShow[columnIndex + tilesCount * 1],
    tilesToShow[columnIndex + tilesCount * 2],
    tilesToShow[columnIndex + tilesCount * 3],
  ];

  return tileIdsInColumn;
};
