import ChartHeader from './components/ChartHeader';
import ChartData from './components/ChartData';
import FilterDialog from './components/FilterDialog';
import styled from '@emotion/styled';
import ChartPagination from './components/ChartPagination';

const Charts = () => {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
  }
`;
export default Charts;
