import React from 'react';
import styled from '@emotion/styled';
import { Button, Divider, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; // Example icon for actions
import TuneIcon from '@mui/icons-material/Tune';
import OpacityIcon from '@mui/icons-material/Opacity'; // For moisture
import SpeedIcon from '@mui/icons-material/Speed'; // For discharge rate
import { GrSystem } from 'react-icons/gr';

import { grey, blue } from '@mui/material/colors';
import { Tune } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';

const Controller = () => {
  const dispatch = useDispatch();

  const handleMoisture = () => {
    dispatch(
      getHomeStateValues({ name: 'moistureSetPointDialog', value: true })
    );
  };
  const handleRate = () => {
    dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: true }));
  };

  const handleMode = () => {
    dispatch(getHomeStateValues({ name: 'modeControlDialog', value: true }));
  };
  const data = [
    {
      id: 1,
      name: 'Moisture SetPoint',
      value: 15,
      action: 'Change',
      icon: <OpacityIcon />,
      className: 'moisture',
      onClick: handleMoisture,
    },
    {
      id: 2,
      name: 'Discharge Rate SetPoint',
      value: 35,
      action: 'Change',
      icon: <SpeedIcon />,
      className: 'discharge',
      onClick: handleRate,
    },
    {
      id: 3,
      name: 'Operating Mode',
      value: 'Auto',
      action: 'Change',
      icon: <GrSystem />,
      className: 'mode',
      onClick: handleMode,
    },
  ];
  return (
    <Wrapper>
      <div className='heading'>Dryer Control</div>
      <div className='content'>
        {data.map((item) => (
          <div
            key={item.id}
            className='item'>
            <div className='name-value'>
              <div className='name'>
                {item.icon && (
                  <IconButton
                    size='medium'
                    color='primary'>
                    {item.icon}
                  </IconButton>
                )}
                {item.name}
              </div>
              <div className='value'>{item.value}</div>
            </div>
            <Divider
              style={{
                margin: '0.5rem 0',
              }}
            />
            <div
              className='action'
              onClick={item.onClick}>
              <Button
                startIcon={<SettingsIcon />}
                color='primary'
                variant='outlined'>
                {item.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#000' : theme.palette.background.paper};
  margin: 1rem;
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.primary.main};
    color: #fff;
    padding: 16px;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .content {
    padding: 1rem;
    @media (max-width: 768px) {
      padding: 1rem 0.5rem 1rem 0.5rem;
    }
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;

    .item {
      padding: 1rem;
      @media (max-width: 768px) {
        padding: 0.5rem;
      }
      border-radius: 8px;
      border: 1px solid ${grey[300]};
      transition: box-shadow 0.3s ease-in-out;

      .name-value {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .name {
        /* font-weight: bold; */
        display: flex;
        align-items: center;
        //button icons
        .MuiIconButton-root {
          color: ${({ theme }) =>
            theme.palette.mode === 'dark' ? '#fff' : 'primary(--main)'};
        }
      }
      .value {
        margin-left: auto;
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
        font-weight: bold;
        font-size: 1rem;
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : grey[200]};
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid
          ${({ theme }) =>
            theme.palette.mode === 'dark' ? grey[800] : grey[300]};
      }

      .action {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export default Controller;
