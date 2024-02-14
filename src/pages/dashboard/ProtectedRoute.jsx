import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getUserStateValues } from '../../features/user/userSlice';
import { getUserCookies } from '../../features/user/lib';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isMember } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const token = getUserCookies('dryermaster_token');
    if (!token) {
      dispatch(getUserStateValues({ name: 'isMember', value: false }));
    }
  }, [location.pathname]);

  if (!isMember) {
    return <Navigate to={'/'} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
