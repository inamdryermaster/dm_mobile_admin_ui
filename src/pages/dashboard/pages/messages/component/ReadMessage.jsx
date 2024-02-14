import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  readMessageThunk,
  toggleDrawer,
} from '../../../../../features/message/messageSlice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, Divider, IconButton } from '@mui/material';
import { icons } from './icons';
import { format } from 'date-fns';
const ReadMessage = () => {
  const { isDrawerOpen, readMessageId, readMessageLoading, readMessage } =
    useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (readMessageId) {
      dispatch(readMessageThunk());
    }
  }, [readMessageId]);
  return (
    <Modal
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      aria-labelledby='read-message-modal'
      aria-describedby='modal-modal-description'>
      <Box sx={style}>
        <Wrapper>
          <div className='heading'>
            <div className='mobile'>
              <IconButton
                onClick={() => dispatch(toggleDrawer())}
                variant='contained'
                className='close-btn'>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className='desktop'>
              <IconButton
                onClick={() => dispatch(toggleDrawer())}
                variant='contained'
                className='close-btn'>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          {readMessageLoading ? (
            <Loading>
              <h1>Loading...</h1>
              <CircularProgress
                size={50}
                thickness={4}
                color='primary'
              />
            </Loading>
          ) : (
            <Content>
              <div className='content-heading'>
                {/*  add icons and color that match with icons */}
                <div
                  className='icon'
                  style={{
                    color: icons.find(
                      (icon) => icon?.name === readMessage?.type
                    )?.backgroundColor,
                  }}>
                  {icons.find((icon) => icon?.name === readMessage?.type)?.icon}
                </div>
                <div className='title'>
                  <h3>{readMessage?.type}</h3>
                </div>
              </div>
              <Divider />
              <div className='date-author'>
                <div className='author'>
                  <span>Sent by: </span>
                  <span className='author-name'>
                    {readMessage?.author
                      ? `Dryer Master Team - ${readMessage?.author}`
                      : 'Dryer Master Team'}
                  </span>
                </div>
                <div className='date'>
                  <span>Date:</span>
                  <span className='date-value'>
                    {readMessage.createdAt &&
                      format(
                        new Date(readMessage?.createdAt),
                        'MMMM dd, yyyy hh:mm:ss a'
                      )}
                  </span>
                </div>
                <div className='body'>
                  <div className='title'>{readMessage?.title}</div>
                  <div className='content'>{readMessage?.content}</div>
                </div>
              </div>
            </Content>
          )}
        </Wrapper>
      </Box>
    </Modal>
  );
};

// Responsive styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '80%', md: '70%' },
  height: { xs: '100%', sm: '80%', md: '70%' },
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const Wrapper = styled.div`
  .heading {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : 'var(--primary)'};
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      .desktop {
        button {
          display: none;
        }
      }
    }
    @media (min-width: 768px) {
      .mobile {
        button {
          display: none;
        }
      }
    }
    .close-btn {
      //icon color
      color: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? theme.palette.grey[300]
          : 'var(--white)'};
      padding: 1rem;
    }
  }
`;
const Content = styled.div`
  overflow-y: auto; // Enable vertical scrolling
  max-height: calc(100vh - 60px);
  @media (min-width: 600px) {
    max-height: calc(80vh - 60px);
  }
  @media (min-width: 960px) {
    max-height: calc(70vh - 60px);
  }
  .content-heading {
    display: flex;
    align-items: center;
    padding: 1rem;
    .icon {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
    .title {
      text-transform: capitalize;
      h3 {
        padding-left: 1rem;
        font-size: 1.6rem;
        margin: 0;
      }
    }
  }
  .date-author {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .author,
  .date {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[100]};
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.grey[300]
        : theme.palette.grey[900]};
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
  }

  .author-name,
  .date-value {
    margin-left: 10px;
    text-transform: capitalize;
  }

  .body {
    margin-top: 20px;
  }

  .body .title {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--primary-10);
    padding-bottom: 10px;
  }

  .body .content {
    font-size: 1rem;
    line-height: 1.6;
    margin-top: 10px;
    white-space: pre-wrap;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.grey[300]};
    padding: 10px 15px;
    @media (max-width: 600px) {
      margin-bottom: 5rem;
    }
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 3rem;
`;

export default ReadMessage;
