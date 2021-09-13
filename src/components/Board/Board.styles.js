import styled from '@emotion/styled';

import { BOARD_WIDTH } from 'utils/constants';

export const BoardContainer = styled.div`
  position: relative;
  width: ${BOARD_WIDTH}px;
`;

export const TilesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
