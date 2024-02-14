import React, { useEffect } from 'react';
import ExistingPaymentMethods from './component/ExistingPaymentMethods';
import PaymentDetails from './component/paymentDetails';
import { useDispatch, useSelector } from 'react-redux';
import { userAccountPaymentCardsThunk } from '../../../../../features/user/userAccountSlice';

import PaymentMethod from './component/PaymentMethod';
import { userSubscriptionStatusThunk } from '../../../../../features/user/userSlice';

const Billing = () => {
  const dispatch = useDispatch();
  const { paymentCards, showNewCard } = useSelector(
    (state) => state.userAccount
  );
  useEffect(() => {
    dispatch(userAccountPaymentCardsThunk());
    dispatch(userSubscriptionStatusThunk());
  }, []);
  return (
    <div>
      <PaymentMethod />
      {showNewCard && <PaymentDetails />}
      {!showNewCard && paymentCards.length > 0 && <ExistingPaymentMethods />}
    </div>
  );
};

export default Billing;
