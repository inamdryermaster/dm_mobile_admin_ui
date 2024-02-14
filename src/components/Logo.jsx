import styled from '@emotion/styled';
import React from 'react';

const Logo = () => {
  return (
    <Wrapper>
      <span>Dryer</span>
      <span>Master</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  span:first-of-type {
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'var(--white)' : 'var(--primary-text)'};
  }
  span:last-of-type {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
export default Logo;
