import React from 'react';
import RegisterUserDetails from './components/Register_UserDetails';
import { useSelector } from 'react-redux';
import RegisterSerial from './components/Register_Serial';

const Register = () => {
  const { isDmRegistered } = useSelector((state) => state.user);
  return (
    <div>{isDmRegistered ? <RegisterUserDetails /> : <RegisterSerial />}</div>
  );
};

export default Register;
