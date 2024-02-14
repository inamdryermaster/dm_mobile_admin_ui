import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { blueGrey, green, grey, orange } from '@mui/material/colors';
import { TbDeviceDesktopCheck } from 'react-icons/tb';
import { TbDeviceDesktopX } from 'react-icons/tb';
import { getUserStateValues } from '../features/user/userSlice';
import Cookies from 'js-cookie';
const DmStatusChecker = () => {
  const dispatch = useDispatch();
  const { isDmOnline } = useSelector((state) => state.user);
  const handleAction = () => {
    dispatch(getUserStateValues({ name: 'isDmOnline', value: !isDmOnline }));
  };
  const dmSerial = Cookies.get('dryermaster_dmSerial');
  const Online = () => {
    return (
      <div>
        <TbDeviceDesktopCheck size={20} />
        <div className='span'>
          <span>SN#{dmSerial}</span>
          <span>Online</span>
        </div>
      </div>
    );
  };
  const Offline = () => {
    return (
      <div>
        <TbDeviceDesktopX size={20} />
        <div className='span'>
          <span>SN#{dmSerial}</span>
          <span>Offline</span>
        </div>
      </div>
    );
  };
  return (
    <Wrapper isDmOnline={isDmOnline}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleAction}>
        {isDmOnline ? <Online /> : <Offline />}
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .MuiButton-root {
    background-color: ${(props) =>
      props.isDmOnline ? green[800] : blueGrey[800]};

    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      display: flex;
      align-items: center;
      gap: 0.1rem;
      .span {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }
    }
    span {
      &:nth-of-type(1) {
        order: 2;
      }
      line-height: 0.8rem;
      margin-left: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

export default DmStatusChecker;
