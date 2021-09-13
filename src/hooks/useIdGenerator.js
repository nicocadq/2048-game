let currentId = 1;

export const useIdGenerator = () => () => {
  currentId += 1;

  return currentId;
};
