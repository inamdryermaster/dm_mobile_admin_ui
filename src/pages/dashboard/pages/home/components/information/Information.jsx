import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

import { grey } from '@mui/material/colors';

const Information = () => {
  const data = [
    {
      id: 2,
      name: 'Predicted Moisture',
      value: 20,
    },
    {
      id: 1,
      name: 'Suggested Rate',
      value: 80,
    },

    {
      id: 3,
      name: 'Ready To Go Automatic',
      value: 'Yes',
    },
  ];
  return (
    <Wrapper>
      <div className='heading'>Dryer Information</div>
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

export default Information;
