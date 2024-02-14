import styled from '@emotion/styled';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FaBell } from 'react-icons/fa6';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import UserCard from './subcomponents/UserCard';
import Notifications from './subcomponents/Notifications';
import DmStatusChecker from '../../../components/DmStatusChecker';

const NavbarMobile = () => {
  const dispatch = useDispatch();

  const handleNavbar = () => {
    dispatch(getSystemStateValues({ name: 'isMobileNavbarOpen', value: true }));
  };
  return (
    <Wrapper>
      <AppBar position='fixed'>
        <Toolbar className='bar'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleNavbar}>
            <MenuIcon fontSize='large' />
          </IconButton>
          <div className='icons'>
            <DmStatusChecker />
            <Notifications />
            <UserCard />
          </div>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  height: 3.5rem;
  @media (min-width: 600px) {
    height: 4rem;
  }
  z-index: 100;
  width: 100%;
  .bar {
    display: flex;
    justify-content: space-between;
  }
  .menu-logo,
  .profile {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .icons {
    display: flex;
    align-items: center;
  }
`;

export default NavbarMobile;
