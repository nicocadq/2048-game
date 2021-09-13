import styled from '@emotion/styled';

import { getColors, getSize, getShadows } from 'helpers/tail';

export const Container = styled.div`
  background-color: ${({ value }) => getColors(value).background};
  border-radius: 6px;
  box-shadow: ${({ value }) => getShadows(value).shadow};
  color: ${({ value }) => getColors(value).color};
  font-size: ${({ value }) => getSize(value).fontSize}px;
  font-weight: bold;
  text-align: center;
  line-height: ${({ value }) => getSize(value).lineHeight};

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
