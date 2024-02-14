import styled from '@emotion/styled';
import { IconButton } from '@mui/material';
import { FaBell } from 'react-icons/fa6';

const Notifications = () => {
  return (
    <Wrapper>
      <IconButton
        size='large'
        aria-label='alert'
        onClick={() => console.log('alert')}
        color='inherit'>
        <FaBell size={28} />
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default Notifications;
