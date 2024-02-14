import React, { useEffect } from 'react';
import Empty from './components/Empty';
import Loading from '../../../../../components/Loading';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAccountStateValues,
  userAccountTransactionHistory,
} from '../../../../../features/user/userAccountSlice';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa';

const getCardIcon = (brand) => {
  switch (brand.toLowerCase()) {
    case 'visa':
      return <FaCcVisa />;
    case 'mastercard':
      return <FaCcMastercard />;
    case 'americanexpress':
      return <FaCcAmex />;
    case 'discover':
      return <FaCcDiscover />;
    default:
      return <FaCcVisa />; // Default icon
  }
};

const Invoice = () => {
  const dispatch = useDispatch();
  const { transactionHistory, transactionLoading, hasMore, limit } =
    useSelector((state) => state.userAccount);

  useEffect(() => {
    dispatch(userAccountTransactionHistory());
  }, [limit, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop);

      if (
        distanceFromBottom < 300 && // Fetch when within 300px from bottom
        !transactionLoading &&
        hasMore
      ) {
        dispatch(
          getUserAccountStateValues({ name: 'limit', value: limit + 10 })
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transactionLoading, hasMore, dispatch]);

  if (transactionLoading && !hasMore) {
    return <Loading />;
  }

  if (!transactionHistory.length && !transactionLoading) {
    return <Empty />;
  }

  return (
    <Wrapper>
      <Title>Transaction History</Title>
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Payment Method</Th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.map((transaction, index) => (
            <Tr key={index}>
              <Td>
                {new Date(transaction.created * 1000).toLocaleDateString()}
              </Td>
              <Td>${transaction.amount / 100} USD</Td>
              <Td
                style={{
                  color:
                    transaction.status === 'succeeded'
                      ? 'green'
                      : transaction.status === 'pending'
                      ? 'orange'
                      : 'red',
                  fontWeight: 500,
                }}>
                {transaction.status.charAt(0).toUpperCase() +
                  transaction.status.slice(1)}
              </Td>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {getCardIcon(transaction.payment_method_details.card.brand)}
                  <span>
                    •••• {transaction.payment_method_details.card.last4}
                  </span>
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      {transactionLoading && <Loading />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  overflow-x: auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  font-weight: 500;
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #e6ebf1;
  white-space: nowrap;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#333' : 'var(--primary)'};
  color: #fff;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e6ebf1;
  white-space: nowrap;
  svg {
    margin-right: 10px;
    font-size: 1.9rem;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : 'var(--primary)'};
  }
`;

const Tr = styled.tr`
  &:hover {
  }
`;

export default Invoice;
