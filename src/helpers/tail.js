export const getSize = (value) => {
  switch (value) {
    case 2:
    case 4:
    case 8:
    case 16:
    case 32:
    case 62:
      return { fontSize: 48, lineHeight: 2.1 };
    case 128:
    case 256:
    case 512:
      return { fontSize: 44, lineHeight: 2.28 };
    case 1024:
    case 2048:
    case 4096:
    case 8192:
      return { fontSize: 32, lineHeight: 3.18 };
    default:
      return { fontSize: 32, lineHeight: 3.18 };
  }
};

export const getColors = (value) => {
  switch (value) {
    case 2:
      return { color: '#776e65', background: '#eee4da' };
    case 4:
      return { color: '#776e65', background: '#ede0c8' };
    case 8:
      return { color: '#f9f6f2', background: '#f2b179' };
    case 16:
      return { color: '#f9f6f2', background: '#f59563' };
    case 32:
      return { color: '#f9f6f2', background: '#f67c5f' };
    case 64:
      return { color: '#f9f6f2', background: '#f65e3b' };
    case 128:
      return { color: '#f9f6f2', background: '#edcf72' };
    case 256:
      return { color: '#f9f6f2', background: '#edcc61' };
    case 512:
      return { color: '#f9f6f2', background: '#edc850' };
    case 1024:
      return { color: '#f9f6f2', background: '#edc53f' };
    case 2048:
    case 4096:
    case 8192:
      return { color: '#f9f6f2', background: '#edc22e' };
    default:
      return { color: '#f9f6f2', background: '#edc22e' };
  }
};

export const getShadows = (value) => {
  switch (value) {
    case 2:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0),    inset 0 0 0 1px rgba(255, 255, 255, 0)',
      };
    case 4:
    case 8:
    case 16:
    case 32:
    case 62:
      return {
        shadow:
          ' 0 0 30px 10px rgba(243, 215, 116, 0),     inset 0 0 0 1px rgba(255, 255, 255, 0)',
      };
    case 128:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0.2381),  inset 0 0 0 1px rgba(255, 255, 255, 0.14286)',
      };
    case 256:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)',
      };
    case 512:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0.39683),  inset 0 0 0 1px rgba(255, 255, 255, 0.2381)',
      };
    case 1024:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)',
      };
    case 2048:
    case 4096:
    case 8192:
    default:
      return {
        shadow:
          '0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)',
      };
  }
};
