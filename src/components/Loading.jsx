import React from 'react';

import { CircularProgress, keyframes } from '@mui/material';
import styled from '@emotion/styled';

const Loading = () => {
  return (
    <Wrapper>
      <Box>
        <StyledCircularProgress
          size={50}
          thickness={4}
          color='secondary'
        />
        <LoadingText>Loading...</LoadingText>
      </Box>
    </Wrapper>
  );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `radial-gradient(
        circle,
        rgba(237, 233, 254, 1) 0%,
        rgba(255, 255, 255, 1) 100%
    )`};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledCircularProgress = styled(CircularProgress)`
  animation: ${rotate} 2s linear infinite;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const LoadingText = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
  animation: ${blink} 1.5s linear infinite;
`;

export default Loading;
