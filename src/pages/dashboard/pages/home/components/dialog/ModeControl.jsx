import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';
import styled from '@emotion/styled';
import { GrSystem } from 'react-icons/gr';
import { grey } from '@mui/material/colors';

const modeData = [
  { value: 'automatic', label: 'Automatic', disabled: false, active: false },
  { value: 'manual', label: 'Manual', disabled: false, active: false },
  { value: 'local', label: 'Local', disabled: false, active: false },
];
const ModeControl = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { modeControlDialog, modeControl } = useSelector((state) => state.home);
  const [mode, setMode] = React.useState('local');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const automaticReady = false;
  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'modeControlDialog', value: false }));
  };

  const handleSubmit = () => {
    // Dispatch action to update the mode here
    handleClose(); // Close drawer after submitting
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setMode(newAlignment);
    }
  };
  useEffect(() => {
    setMode(modeControl);
  }, [modeControl]);
  return (
    <Drawer
      anchor='right'
      open={modeControlDialog}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <GrSystem />
            Mode Control
          </div>
        </div>
        <div className='body'>
          <div className='information'>
            <div className='current_value'>
              Currently you are in <span>{modeControl}</span> mode.
            </div>
          </div>
          <ToggleButtonGroup
            color='primary'
            value={mode}
            exclusive
            onChange={handleAlignment}
            fullWidth>
            {modeData.map((item, index) => (
              <ToggleButton
                key={index}
                value={item.value}
                disabled={mode === item.value}
                className={mode === item.value ? 'active' : ''}>
                {item.label}
                {/* {item.value === 'automatic' && !automaticReady && (
                  <span>Calibrating</span>
                )} */}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {!automaticReady && (
            <div className='info'>
              The dryer is currently calibrating to your specific conditions.
              Automatic mode will be available shortly after initial learning is
              complete.
            </div>
          )}
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
            variant='contained'
            disabled={!mode}>
            Update Mode
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
  height: 100%;

  .heading {
    border-bottom: 1px solid #e0e0e0;

    .title {
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        font-size: 2rem;
        // icon color
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }
  }

  .body {
    .current_value {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 1rem 0;
      span {
        font-weight: bold;
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
        text-transform: capitalize;
        margin-left: 5px;
        margin-right: 5px;
      }
    }

    .MuiTextField-root {
      /* margin-top: 10px; */
    }
    .info {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 1rem 0;
      border: 1px solid #e0e0e0;
      padding: 10px;
      border-radius: 8px;
      //info
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#333' : '#f9f9f9'};
    }
    .active {
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[900] : grey[200]};
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 10px;

    .MuiButton-root {
      font-size: 14px;
    }
  }
`;

export default ModeControl;
