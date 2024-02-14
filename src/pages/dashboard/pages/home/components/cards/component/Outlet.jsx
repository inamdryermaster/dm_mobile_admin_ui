import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getHomeStateValues } from '../../../../../../../features/home/homeSlice';

const Outlet = () => {
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(
      getHomeStateValues({ name: 'moistureSetPointDialog', value: true })
    );
  };
  return (
    <Wrapper>
      <div className='heading'>
        <div className='title'>Outlet</div>
        <div className='warning_alert'>
          {/* <div className='warning'>Warning</div>
          <div className='alert'>Alert</div> */}
        </div>
      </div>
      <div className='body'>
        <div className='value'>
          <div className='main'>13.91</div>
          <div className='sub'>
            102.7 <span> &#8451;</span>
          </div>
        </div>
        <div
          className='second_value'
          onClick={handleClickOpen}>
          <div className='main'>
            <span>SetPoint:</span>
            <span>15</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#000' : '#428bca'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && 'px solid #333'};
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 8px;
  overflow: hidden;
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[800] : '#afcfe9'};
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? `3px solid ${grey[600]}`
        : '3px solid var(--primary)'};

    gap: 1rem;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
      color: ${({ theme }) => theme.palette.mode === 'dark' && '#428bca'};
    }

    .warning_alert {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0.5rem;
      .warning {
        background: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : '#0961ad'};
      }
      .alert {
        background: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[900] : '#0961ad'};
      }
      .warning,
      .alert {
        border: 1px solid #ffffff;
        color: #ffffff;
        border-radius: 8px;
        padding: 0.3rem;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    .value {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      color: #ffffff;
      .main {
        font-size: 2.5rem;
        font-weight: 500;
        color: #ffffff;
      }
    }

    .second_value {
      color: #ffffff;
      border: 1px solid #ffffff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 2rem;
      padding: 0rem 0.5rem;
      .main {
        display: flex;
        gap: 0.5rem;
        color: #ffffff;
        justify-content: space-between;
      }
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[900] : '#0961ad'};
      transition: all 0.3s ease;
      :hover {
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? grey[700] : '#064074'};
        cursor: pointer;
      }
    }
  }
`;
export default Outlet;
