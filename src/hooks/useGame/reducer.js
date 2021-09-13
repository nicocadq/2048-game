import { types } from './actions';

export const initialState = {
  tiles: {},
  tilesIds: [],
  hasChanged: false,
  inMotion: false,
  score: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.TILE_CREATE:
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [action.tile.id]: action.tile,
        },
        tilesIds: [...state.tilesIds, action.tile.id],
        hasChanged: false,
      };
    case types.TILE_UPDATE:
      return {
        ...state,
        tiles: {
          ...state.tiles,
          [action.tile.id]: action.tile,
        },
        hasChanged: true,
      };
    case types.TILE_MERGE: {
      const {
        [action.origin.id]: origin,
        [action.destination.id]: destination,
        ...restTiles
      } = state.tiles;

      return {
        ...state,
        tiles: {
          ...restTiles,
          [action.destination.id]: {
            id: action.destination.id,
            value: action.origin.value + action.destination.value,
            position: action.destination.position,
          },
        },
        tilesIds: state.tilesIds.filter((id) => id !== action.origin.id),
        hasChanged: true,
        score: state.score + (action.origin.value + action.destination.value),
      };
    }
    case types.MOVE_START:
      return {
        ...state,
        inMotion: true,
      };
    case types.MOVE_END:
      return {
        ...state,
        inMotion: false,
      };
    default:
      return state;
  }
};
