import * as React from 'react';
import {
  Button,
  Drawer,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import SpeedIcon from '@mui/icons-material/Speed';
const RateSetPoint = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { rateSetPointDialog, rateSetPoint } = useSelector(
    (state) => state.home
  );
  const [newRateSetPoint, setNewRateSetPoint] = React.useState(rateSetPoint);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: false }));
  };

  const handleSubmit = () => {
    // Dispatch action to update the rate set point here
    handleClose(); // Close drawer after submitting
  };

  return (
    <Drawer
      anchor='right'
      open={rateSetPointDialog}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <SpeedIcon></SpeedIcon> Rate Set Point
          </div>
        </div>
        <div className='body'>
          <div className='current_value'>
            <span>Current Set Point:</span>
            <span>{rateSetPoint}%</span>
          </div>
          <TextField
            fullWidth
            autoFocus
            margin='dense'
            id='rateSetPoint'
            label='Desired Rate Set Point'
            type='number'
            variant='outlined'
            value={newRateSetPoint}
            onChange={(e) => setNewRateSetPoint(e.target.value)}
          />
          <div className='content'>
            Adjust the discharge rate set point to fine-tune the dryer&apos;s
            speed, matching your operational throughput needs.
          </div>
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
            Update Set Point
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
    .current_value {
      font-size: 16px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:first-child {
        font-weight: bold;
      }
    }

    .content {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 20px 0;
      border: 1px solid #e0e0e0;
      padding: 10px;
      border-radius: 8px;
      //info
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#333' : '#f9f9f9'};
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export default RateSetPoint;
