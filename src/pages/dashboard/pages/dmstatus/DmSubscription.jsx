import styled from '@emotion/styled';
import { Button, Card, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Importing the icon
import React from 'react';
import { format, set } from 'date-fns';

import { useSelector } from 'react-redux';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';
import { useNavigate } from 'react-router-dom';

const DmSubscription = () => {
  const navigate = useNavigate();
  const { subscriptionExpiry, role } = useSelector((state) => state.user);
  const expiryDate =
    subscriptionExpiry && format(new Date(subscriptionExpiry), 'dd MMMM yyyy');

  const onClick = () => {
    navigate('/dashboard/account/billing');
  };
  return (
    <Wrapper>
      <CardWrapper>
        <div className='body'>
          <div className='title'>Subscription Expired</div>
          <Typography variant='body1'>
            Thank you for using Dryer Master. Your subscription period has ended
            on <strong>{expiryDate}</strong>. To continue enjoying our services,
            please renew your subscription.
          </Typography>
          {role === 'user' && (
            <Button
              variant='contained'
              size='large'
              onClick={onClick}
              startIcon={<AutorenewIcon />} // Adding the icon to the button
            >
              Renew Subscription
            </Button>
          )}
          {role === 'operator' && (
            <div className='operator_message'>
              Please contact your account administrator to renew the
              subscription.
            </div>
          )}
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  place-items: center;
  h2 {
    font-weight: 500;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.info.main
        : 'var(--primary-text)'};
  }
  .body {
    display: grid;
    gap: 1rem;
    strong {
      color: ${({ theme }) => theme.palette.info.main};
      white-space: nowrap;
    }
  }
  .operator_message {
    border: 1px solid ${({ theme }) => theme.palette.info.main};
    padding: 1rem;
    border-radius: 10px;
    color: ${({ theme }) => theme.palette.info.main};
    font-weight: 500;
  }
`;

export default DmSubscription;
