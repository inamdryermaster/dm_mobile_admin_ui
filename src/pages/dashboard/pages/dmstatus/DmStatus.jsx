import React from 'react';
import { useSelector } from 'react-redux';
import DmSubscription from './DmSubscription';
import DmReconnect from './DmReconnect';

const DmStatus = () => {
  const { isDmOnline, isSubscriptionActive } = useSelector(
    (state) => state.user
  );

  if (!isSubscriptionActive) {
    return <DmSubscription />;
  } else if (!isDmOnline) {
    return <DmReconnect />;
  }

  return <div>DmStatus</div>;
};

export default DmStatus;
