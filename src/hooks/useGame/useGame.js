import { useCallback, useEffect, useReducer, useRef } from 'react';

import {
  getIndexByPosition,
  getPositionByIndex,
  didTileMove,
  getTilesIdsByRow,
  getTilesIdsByColumn,
} from 'helpers/game';
import { useIdGenerator } from 'hooks/useIdGenerator';
import { ANIMATION_DURATION, TILES_COUNT as tilesCount } from 'utils/constants';
import { actions } from './actions';
import { initialState, reducer } from './reducer';

export const useGame = () => {
  const getNextId = useIdGenerator();

  const isFirstRender = useRef(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tiles, tilesIds, hasChanged, inMotion, score } = state;

  const createTile = useCallback(
    ({ position, value }) => {
      const tile = {
        id: getNextId(),
        position,
        value,
      };

      dispatch(actions.tileCreate({ tile }));
    },
    [getNextId]
  );

  const mergeTile = useCallback(({ origin, destination }) => {
    dispatch(actions.tileMerge({ origin, destination }));
  }, []);

  const debouncedMergeTile = useCallback(
    ({ origin, destination }) => {
      setTimeout(() => mergeTile({ origin, destination }), ANIMATION_DURATION);
    },
    [mergeTile]
  );

  const updateTile = useCallback(({ tile }) => {
    dispatch(actions.tileUpdate({ tile }));
  }, []);

  // THINK: could be `getFilledGaps`
  const calculateBoard = useCallback(() => {
    const tilesToShow = new Array(tilesCount * tilesCount).fill(0);

    tilesIds.forEach((id) => {
      const { position } = tiles[id];
      const index = getIndexByPosition(position, tilesCount);
      tilesToShow[index] = id;
    });

    return tilesToShow;
  }, [tilesIds, tiles]);

  const getEmptyGaps = useCallback(() => {
    const showedTiles = calculateBoard();

    const emptyGaps = showedTiles.reduce((result, tileId, index) => {
      if (tileId === 0) {
        return [...result, getPositionByIndex(index, tilesCount)];
      }

      return result;
    }, []);

    return emptyGaps;
  }, [calculateBoard]);

  const generateRandomTile = useCallback(() => {
    const emptyGaps = getEmptyGaps();

    if (emptyGaps.length > 0) {
      const index = Math.floor(Math.random() * emptyGaps.length);
      const position = emptyGaps[index];

      createTile({ position, value: 2 });
    }
  }, [getEmptyGaps, createTile]);

  const move = useCallback(
    (retrieveTileIdsPerRowOrColumn, calculateFirstFreeIndex) => {
      dispatch(actions.moveStart());

      const maxIndex = tilesCount - 1;

      for (
        let rowOrColumnIndex = 0;
        rowOrColumnIndex < tilesCount;
        rowOrColumnIndex += 1
      ) {
        let previousTile;
        let mergedTilesCount = 0;

        const availableTileIds =
          retrieveTileIdsPerRowOrColumn(rowOrColumnIndex);

        // eslint-disable-next-line consistent-return
        availableTileIds.forEach((tileId, nonEmptyTileIndex) => {
          const currentTile = tiles[tileId];

          if (
            previousTile !== undefined &&
            previousTile.value === currentTile.value
          ) {
            const tile = {
              ...currentTile,
              position: previousTile.position,
              mergeWith: previousTile.id,
            };

            debouncedMergeTile({ origin: tile, destination: previousTile });

            previousTile = undefined;
            mergedTilesCount += 1;

            return updateTile({ tile });
          }

          const tile = {
            ...currentTile,
            position: getPositionByIndex(
              calculateFirstFreeIndex(
                rowOrColumnIndex,
                nonEmptyTileIndex,
                mergedTilesCount,
                maxIndex
              ),
              tilesCount
            ),
          };

          previousTile = tile;

          if (didTileMove({ origin: currentTile, destination: tile })) {
            return updateTile({ tile });
          }
        });
      }

      setTimeout(() => dispatch(actions.moveEnd()), ANIMATION_DURATION);
    },
    [debouncedMergeTile, tiles, updateTile]
  );

  const moveLeft = () => {
    const tilesIdsByRow = (rowIndex) => {
      const tileIdsInRow = getTilesIdsByRow({
        rowIndex,
        tilesCount,
        calculateBoard,
      });

      const filledGapsInRow = tileIdsInRow.filter((id) => id !== 0);
      return filledGapsInRow;
    };

    const calculateFirstFreeIndex = (
      tileIndex,
      tileInRowIndex,
      mergesCount,
      _
    ) => tileIndex * tilesCount + tileInRowIndex - mergesCount;

    return move(tilesIdsByRow, calculateFirstFreeIndex);
  };

  const moveRight = () => {
    const tilesIdsByRow = (rowIndex) => {
      const tileIdsInRow = getTilesIdsByRow({
        rowIndex,
        tilesCount,
        calculateBoard,
      });

      const nonEmptyTiles = tileIdsInRow.filter((id) => id !== 0);
      return nonEmptyTiles.reverse();
    };

    const calculateFirstFreeIndex = (
      tileIndex,
      tileInRowIndex,
      mergesCount,
      maxIndexInRow
    ) => tileIndex * tilesCount + maxIndexInRow + mergesCount - tileInRowIndex;

    return move(tilesIdsByRow, calculateFirstFreeIndex);
  };

  const moveUp = () => {
    const tileIdsByColumn = (columnIndex: number) => {
      const tileIdsInColumn = getTilesIdsByColumn({
        columnIndex,
        tilesCount,
        calculateBoard,
      });

      const nonEmptyTiles = tileIdsInColumn.filter((id) => id !== 0);
      return nonEmptyTiles;
    };

    const calculateFirstFreeIndex = (
      tileIndex,
      tileInColumnIndex,
      mergesCount,
      _
    ) => tileIndex + tilesCount * (tileInColumnIndex - mergesCount);

    return move(tileIdsByColumn, calculateFirstFreeIndex);
  };

  const moveDown = () => {
    const tileIdsByColumn = (columnIndex: number) => {
      const tileIdsInColumn = getTilesIdsByColumn({
        columnIndex,
        tilesCount,
        calculateBoard,
      });

      const nonEmptyTiles = tileIdsInColumn.filter((id) => id !== 0);
      return nonEmptyTiles.reverse();
    };

    const calculateFirstFreeIndex = (
      tileIndex,
      tileInColumnIndex,
      mergesCount,
      maxIndexInColumn
    ) => {
      return (
        tileIndex +
        tilesCount * (maxIndexInColumn - tileInColumnIndex + mergesCount)
      );
    };

    return move(tileIdsByColumn, calculateFirstFreeIndex);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      createTile({ position: [0, 1], value: 2 });
      createTile({ position: [0, 2], value: 2 });
      isFirstRender.current = false;
    }

    if (!inMotion && hasChanged) {
      generateRandomTile();
    }
  }, [hasChanged, inMotion, createTile, generateRandomTile]);

  const tilesToReturn = tilesIds.map((id) => tiles[id]);

  return {
    tiles: tilesToReturn,
    moves: { left: moveLeft, right: moveRight, up: moveUp, down: moveDown },
    score,
  };
};
