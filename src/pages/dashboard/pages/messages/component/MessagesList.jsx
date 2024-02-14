import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleDrawer } from '../../../../../features/message/messageSlice';
import { icons } from './icons';
import { grey } from '@mui/material/colors';

const MessagesList = () => {
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  // date-fn format convert show only day and month and year only if not the same year
  const dateConvert = (date) => {
    const dateNow = new Date();
    const dateMessage = new Date(date);
    if (dateNow.getFullYear() === dateMessage.getFullYear()) {
      return dateMessage.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
      });
    } else {
      // Handle formatting for different years if needed
      return dateMessage.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });
    }
  };

  return (
    <Wrapper>
      {messages.map((message, index) => {
        const icon = icons.find((icon) => icon?.name === message?.type);

        return (
          <Item
            key={index}
            readMessage={message.readMessage}
            onClick={() => dispatch(toggleDrawer(message._id))}>
            <div
              className='icon'
              style={{ color: icon?.backgroundColor }}>
              {icon?.icon}
            </div>
            <div className='content'>
              <div className='title'>
                <h3>{message.type}</h3>
              </div>
              <div className='message'>
                <p>{message.title}</p>
              </div>
            </div>
            <div className='date'>
              <p>{dateConvert(message.createdAt)}</p>
            </div>
          </Item>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  :hover {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[800] : '#f5f5f5'};
    cursor: pointer;
  }

  .icon {
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex: 1;
    padding: 0 1rem;

    .title {
      h3 {
        font-size: 1.2rem;
        font-weight: ${({ readMessage }) => (readMessage ? 400 : 700)};
        margin: 0;
        text-transform: capitalize;
      }
    }

    .message {
      p {
        font-size: 1rem;
        font-weight: ${({ readMessage }) => (readMessage ? 400 : 700)};
        @media (max-width: 768px) {
          margin: 0;
        }
      }
    }
  }

  .date {
    p {
      font-size: 1rem;
      font-weight: ${({ readMessage }) => (readMessage ? 400 : 700)};
      margin: 0;
    }
  }
`;

export default MessagesList;
