import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import NavbarDrawerMobile from './components/NavbarDrawerMobile';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getSystemStateValues } from '../../features/system/systemSlice';
import NavbarDrawerDesktop from './components/NavbarDrawerDesktop';
import { subscriptionExpiryCheck } from '../../features/user/lib';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();
  const { pathname } = useLocation();

  // close mobile navbar on desktop view
  useEffect(() => {
    if (width > 768) {
      dispatch(
        getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
      );
    }
  }, [width, height]);

  // check subscription expiry on every route change
  useEffect(() => {
    subscriptionExpiryCheck(dispatch);
  }, [pathname]);

  return (
    <Wrapper>
      <div className='desktop'>
        <div className='drawer'>
          <NavbarDrawerDesktop />
        </div>
        <div className='nav-outlet'>
          <NavbarDesktop />
          {width > 768 && <Outlet />}
        </div>
      </div>
      <div className='mobile'>
        <NavbarDrawerMobile />
        <NavbarMobile />
        {width < 769 && <Outlet />}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .mobile {
    @media (min-width: 769px) {
      display: none;
    }
  }
  .desktop {
    @media (max-width: 768px) {
      display: none;
    }
    display: flex;
    .nav-outlet {
      width: 100%;
    }
  }
`;
export default DashboardLayout;
