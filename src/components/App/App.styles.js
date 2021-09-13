import styled from '@emotion/styled';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const Title = styled.h1`
  color: #776e65;
  margin-left: 2rem;
`;

export const ResetButton = styled.button`
  background-color: #776e65;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  height: 3rem;
  margin-right: 2rem;
  padding: 0.5rem;
`;
