import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import { Divider, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Logo from '../../../components/Logo';
import NavbarList from './subcomponents/NavbarList';
const NavbarDrawerDesktop = () => {
  const dispatch = useDispatch();

  const { showDesktopDrawerText } = useSelector((state) => state.system);
  return (
    <Wrapper $showDesktopDrawerText={showDesktopDrawerText}>
      <div className='toggle-drawer'>
        <IconButton
          aria-label='show'
          onClick={() =>
            dispatch(
              getSystemStateValues({
                name: 'showDesktopDrawerText',
                value: !showDesktopDrawerText,
              })
            )
          }>
          {showDesktopDrawerText ? (
            <KeyboardArrowLeftIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      </div>
      <div className='header'>
        <Logo />
      </div>
      <Divider />
      <Body>
        <NavbarList />
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  width: ${(props) => (props.$showDesktopDrawerText ? '300px' : '4rem')};
  background-color: ${(props) =>
    props.theme.palette.mode === 'light'
      ? props.theme.palette.background.paper
      : props.theme.palette.grey[900]};
  border-right: 1px solid ${(props) => props.theme.palette.divider};
  .toggle-drawer {
    position: absolute;
    top: 0.6rem;
    right: 0;
    height: 2.5rem;
  }
  .header {
    display: flex;
    width: ${(props) => (props.$showDesktopDrawerText ? '100%' : '0rem')};
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    height: 3.5rem;
    padding-left: 1rem;
  }
`;

const Body = styled.div``;
export default NavbarDrawerDesktop;
