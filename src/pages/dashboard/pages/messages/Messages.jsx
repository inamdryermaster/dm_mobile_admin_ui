import React, { useEffect, useState } from 'react';
import { getUserCookies } from '../../../../features/user/lib';
import { customFetch } from '../../../../lib/customeFetch';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMessageStateValues,
  messagesThunk,
} from '../../../../features/message/messageSlice';
import MessagesList from './component/MessagesList';
import Loading from '../../../../components/Loading';
import ReadMessage from './component/ReadMessage';
import styled from '@emotion/styled';
import Empty from './component/Empty';

const Messages = () => {
  const { isLoading, hasMore, messages } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessageStateValues({ name: 'page', value: 1 }));
    dispatch(getMessageStateValues({ name: 'limit', value: 15 }));
    dispatch(getMessageStateValues({ name: 'messages', value: [] }));
    dispatch(messagesThunk());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop);

      if (
        distanceFromBottom < 300 && // Fetch when within 300px from bottom
        !isLoading &&
        hasMore
      ) {
        dispatch(messagesThunk());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, dispatch]);

  if (isLoading && !hasMore) {
    return <Loading />;
  }

  if (!messages.length && !isLoading) {
    return <Empty />;
  }

  return (
    <Wrapper>
      <ReadMessage />
      <MessagesList />
      {isLoading && <Loading />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* position: relative; */
`;
export default Messages;
