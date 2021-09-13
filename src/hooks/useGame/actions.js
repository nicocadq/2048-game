export const types = {
  TILE_CREATE: 'TILE_CREATE',
  TILE_UPDATE: 'TILE_UPDATE',
  TILE_MERGE: 'TILE_MERGE',
  MOVE_START: 'MOVE_START',
  MOVE_END: 'MOVE_END',
};

export const actions = {
  tileCreate: ({ tile }) => ({
    type: types.TILE_CREATE,
    tile,
  }),
  tileUpdate: ({ tile }) => ({
    type: types.TILE_UPDATE,
    tile,
  }),
  tileMerge: ({ origin, destination }) => ({
    type: types.TILE_MERGE,
    origin,
    destination,
  }),
  moveStart: () => ({ type: types.MOVE_START }),
  moveEnd: () => ({ type: types.MOVE_END }),
};
