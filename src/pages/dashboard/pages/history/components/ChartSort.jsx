import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Select, MenuItem, Typography } from '@mui/material';

const ChartSort = () => {
  const [resultLimit, setResultLimit] = useState(30);
  const [averageOption, setAverageOption] = useState(10);

  const handleResultChange = (event) => {
    setResultLimit(event.target.value);
  };

  const handleAverageChange = (event) => {
    setAverageOption(event.target.value);
  };

  return (
    <Wrapper>
      <div className='dropdown-1'>
        <Typography variant='subtitle2'>Results per page:</Typography>
        <Select
          value={resultLimit}
          onChange={handleResultChange}>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={150}>150</MenuItem>
        </Select>
      </div>
      <div className='dropdown-2'>
        <Typography variant='subtitle2'>Average data interval:</Typography>
        <Select
          value={averageOption}
          onChange={handleAverageChange}>
          <MenuItem value={10}>10 min</MenuItem>
          <MenuItem value={30}>30 min</MenuItem>
          <MenuItem value={60}>60 min</MenuItem>
        </Select>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .dropdown-1,
  .dropdown-2 {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    //menu item size
    @media (max-width: 768px) {
      display: grid;
      gap: 0rem;
    }
    .MuiSelect-select {
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
    }
    //icons margin left
    .MuiSelect-icon {
    }
    p {
    }
  }
`;
export default ChartSort;
