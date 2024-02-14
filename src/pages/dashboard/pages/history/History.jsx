import React from 'react';
import ChartData from './components/ChartData';
import ChartHeader from './components/ChartHeader';
import FilterDialog from './components/FilterDialog';
import ChartPagination from './components/ChartPagination';
import styled from '@emotion/styled';

const History = () => {
  return (
    <Wrapper>
      <FilterDialog />
      <div className='filter-pagination'>
        <ChartHeader />
        <ChartPagination />
      </div>
      <ChartData />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .filter-pagination {
    position: sticky;
    top: 3.5rem;
    z-index: 999;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : '#fff'};
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
`;
export default History;
