import styled from '@emotion/styled';
import ChartData from './components/ChartData';

const Chart = () => {
  return (
    <Wrapper>
      {/* <MainChart />
      <ControlChart /> */}
      <ChartData />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* display: grid;
  gap: 1rem; */
`;
export default Chart;
