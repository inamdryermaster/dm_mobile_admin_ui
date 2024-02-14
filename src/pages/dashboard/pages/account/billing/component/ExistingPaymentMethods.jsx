import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa';
import styled from '@emotion/styled';
import Loading from '../../../../../../components/Loading';
import Empty from './Empty';
import {
  userAccountExistingPaymentDetachThunk,
  userAccountExistingPaymentThunk,
} from '../../../../../../features/user/userAccountSlice';

const initialState = {
  renewId: '',
  removeId: '',
};
const ExistingPaymentMethods = () => {
  const [state, setState] = React.useState(initialState);
  const dispatch = useDispatch();
  const { paymentCards, isLoading, renewLoading, removeLoading } = useSelector(
    (state) => state.userAccount
  );
  const { isSubscriptionActive } = useSelector((state) => state.user);

  const handleRemoveCard = (id) => {
    dispatch(userAccountExistingPaymentDetachThunk(id));
    setState({ ...state, removeId: id });
  };

  const handleRenewSubscription = (id) => {
    dispatch(userAccountExistingPaymentThunk(id));
    setState({ ...state, renewId: id });
  };
  const getCardIcon = (brand) => {
    switch (
      brand.toLowerCase() // Ensure lowercase comparison
    ) {
      case 'visa':
        return <FaCcVisa />; // Visa blue
      case 'mastercard':
        return <FaCcMastercard />; // Mastercard red
      case 'americanexpress':
        return <FaCcAmex />; // Amex blue
      case 'discover':
        return <FaCcDiscover />; // Discover orange
      default:
        return <FaCcVisa />; // Default to Visa if unmatched
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (paymentCards.length === 0) {
    return <Empty />;
  }
  return (
    <Wrapper>
      <Typography
        variant='h6'
        component='div'
        sx={{ marginBottom: '1rem' }}>
        Existing Payment Methods
      </Typography>
      <div className='body'>
        {paymentCards.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            key={item.id}>
            <PaymentCard>
              <CardContent>
                <CardDetails>
                  {getCardIcon(item.card.brand)}
                  <Typography variant='subtitle1'>
                    **** **** **** {item.card.last4}
                  </Typography>
                </CardDetails>
                <Typography
                  color='textSecondary'
                  className='card-expiry'>
                  Expires {item.card.exp_month}/{item.card.exp_year}
                </Typography>
                <CardActions>
                  {!isSubscriptionActive && (
                    <Button
                      variant='outlined'
                      color='primary'
                      size='small'
                      disabled={item.id === state.renewId && renewLoading}
                      onClick={() => handleRenewSubscription(item.id)}>
                      {item.id === state.renewId && renewLoading
                        ? 'Renewing...'
                        : 'Renew Subscription'}
                    </Button>
                  )}
                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'
                    disabled={item.id === state.removeId && removeLoading}
                    onClick={() => handleRemoveCard(item.id)}>
                    {item.id === state.removeId && removeLoading
                      ? 'Removing...'
                      : 'Remove'}
                  </Button>
                </CardActions>
              </CardContent>
            </PaymentCard>
          </Grid>
        ))}
      </div>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled('div')`
  padding: 20px;
  .body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
  }
`;

const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardDetails = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    font-size: 2.5rem;
    color: ${(props) =>
      props.theme.palette.mode === 'dark' ? '#fff' : 'var(--primary)'};
  }
`;

const CardActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default ExistingPaymentMethods;
