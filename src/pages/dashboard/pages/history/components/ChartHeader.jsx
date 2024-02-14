import React from 'react';
import { useDispatch } from 'react-redux';
import { getChartStateValues } from '../../../../../features/chart/chartSlice';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
const ChartHeader = () => {
  const dispatch = useDispatch();
  const handleFilterDialog = () => {
    dispatch(
      getChartStateValues({ name: 'showFilterDialogHistory', value: true })
    );
    console.log('Filter Dialog');
  };
  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={handleFilterDialog}
        startIcon={<FilterAltOutlinedIcon />}>
        Filter
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default ChartHeader;
