import React, { useRef } from 'react';
import Inlet from './component/Inlet';
import Outlet from './component/Outlet';
import RateControl from './component/RateControl';
import DryingTemperature from './component/DryingTemperature';
import styled from '@emotion/styled';

const Cards = () => {
  return (
    <Wrapper>
      <Inlet />
      <Outlet />
      <RateControl />
      <DryingTemperature />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  display: grid;
  gap: 1rem;
  @media (min-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export default Cards;
