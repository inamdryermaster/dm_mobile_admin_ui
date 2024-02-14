import React from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import styled from '@emotion/styled';

import { getUserCookies } from '../../../../../../features/user/lib'; // Ensure the path is correct
import { customFetch } from '../../../../../../lib/customeFetch';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import CardWrapper from '../../../../../../styles/wrappers/CardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { userSubscriptionStatusThunk } from '../../../../../../features/user/userSlice';

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },

    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { isSubscriptionActive } = useSelector((state) => state.user);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe has not fully loaded yet.');
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    // Stripe Elements does not support a separate PostalCodeElement
    // You would need to handle the postal code as a normal input field if required

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        setLoading(true);
        const token = getUserCookies('dryermaster_token'); // Adjust the cookie name as needed
        const response = await customFetch.post(
          '/dryermaster/account/stripe', // Your specific endpoint
          { paymentMethodId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success(response.data.message);
        setLoading(false);
        dispatch(userSubscriptionStatusThunk());
      } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      console.error('Stripe error:', error);
      toast.error(error.message);
    }
  };

  return (
    <Wrapper>
      <StyledCardWrapper>
        <div className='title'>Payment Details</div>
        <StyledForm onSubmit={handleSubmit}>
          <Label>
            Card Number
            <CardNumberElement
              className='element'
              options={ELEMENT_OPTIONS}
            />
          </Label>
          <div className='expiry-cvv'>
            <Label>
              Expiry Date
              <CardExpiryElement
                className='element'
                options={ELEMENT_OPTIONS}
              />
            </Label>
            <Label>
              CVC / CVV
              <CardCvcElement
                className='element'
                options={ELEMENT_OPTIONS}
              />
            </Label>
          </div>
          {/* Implement the postal code as a normal input field if necessary */}
          <PayButton
            type='submit'
            variant='contained'
            disabled={!stripe || loading || isSubscriptionActive}>
            {loading ? 'Please wait...' : 'Renew Subscription'}
          </PayButton>
        </StyledForm>
      </StyledCardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .element {
    width: 100%;
    padding: 10px 14px;
    margin: 10px 0;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'var(--dark-2)' : 'var(--light-2)'};
    min-width: 130px;
  }
  .expiry-cvv {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
`;
const StyledCardWrapper = styled(CardWrapper)`
  margin-top: 3rem;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? 'var(--white)' : 'var(--primary-18)'};
  font-weight: 500;
`;

const PayButton = styled(Button)``;

export default PaymentDetails;
