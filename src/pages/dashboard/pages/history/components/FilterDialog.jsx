import * as React from 'react';
import {
  Button,
  Drawer,
  useTheme,
  useMediaQuery,
  CardHeader,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegChartBar } from 'react-icons/fa';
import styled from '@emotion/styled';
import { getChartStateValues } from '../../../../../features/chart/chartSlice';
import ChartDatePicker from './ChartDatePicker';
import ChartSort from './ChartSort';
import { MdHistory, MdRefresh } from 'react-icons/md';
const FilterDialog = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showFilterDialogHistory } = useSelector((state) => state.chart);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch(
      getChartStateValues({ name: 'showFilterDialogHistory', value: false })
    );
  };

  const handleSubmit = () => {
    // Dispatch action to update the rate set point here
    handleClose(); // Close drawer after submitting
  };

  return (
    <Drawer
      anchor='right'
      open={showFilterDialogHistory}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <MdHistory />
            Filter
          </div>
          <div className='button'>
            <Button variant='outlined'>
              <MdRefresh />
              Reset Filter
            </Button>
          </div>
        </div>
        <div className='body'>
          <ChartSort />
          <ChartDatePicker />
        </div>
        <div className='footer'>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'>
            Discard Changes
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            variant='contained'>
            Apply Filter
          </Button>
        </div>
      </Wrapper>
    </Drawer>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      display: flex;
      justify-content: flex-end;

      button {
      }
      //icon
      svg {
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
    border-bottom: 1px solid #e0e0e0;
    .title {
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        font-size: 2.5rem;
        // icon color
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }
  }

  .body {
    padding: 1rem 0;
    display: grid;
    gap: 1rem;
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export default FilterDialog;
