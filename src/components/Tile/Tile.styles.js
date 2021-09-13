import styled from '@emotion/styled';

export const Container = styled.div`
  background-color: #eee4da;
  border-radius: 6px;
  color: #776e65;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  line-height: 2.1;

  height: 100px;
  margin: 16px;
  width: 100px;

  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  z-index: ${({ index }) => index};

  transition-property: left, top, transform;
  transition-duration: 250ms, 250ms, 100ms;
  transform: ${({ scale }) => `scale(${scale})`};
`;
