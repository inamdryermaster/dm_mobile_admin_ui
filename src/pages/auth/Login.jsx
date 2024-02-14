import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ToggleTheme from '../../components/ToggleTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFormValidation from '../../hooks/useFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginThunk } from '../../features/user/userSlice';
import CardWrapper from '../../styles/wrappers/CardWrapper';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const { formState, validateEmail, validatePassword, handleChange } =
    useFormValidation();
  const {
    email,
    password,
    emailError,
    passwordError,
    emailErrorList,
    passwordErrorList,
  } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      dispatch(userLoginThunk({ email, password }));
    }
  };

  return (
    <Wrapper>
      <CardWrapper>
        <Heading>
          <div className='title'>Sign in</div>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              New User?
            </Typography>
            <Link to='/register'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Create an account
              </Typography>
            </Link>
          </HeadingBody>
        </Heading>
        <form onSubmit={handleSubmit}>
          <Body>
            <TextField
              fullWidth
              type='email'
              label='Email address'
              variant='outlined'
              name='email'
              value={email}
              onChange={handleFieldChange}
              error={emailError}
              required
            />
            {emailError && (
              <ErrorList>
                {emailErrorList.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ErrorList>
            )}
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              name='password'
              value={password}
              onChange={handleFieldChange}
              error={passwordError}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {passwordError && (
              <ErrorList>
                {passwordErrorList.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ErrorList>
            )}
            <ForgotPassword>
              <Link to='/forgot-password'>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 500 }}>
                  Forgot password?
                </Typography>
              </Link>
            </ForgotPassword>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    color='inherit'
                    style={{ marginRight: '10px' }} // Add some spacing between the spinner and the text
                  />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
            <ToggleTheme />
          </Body>
        </form>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  .heading-title {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: 'Public Sans', sans-serif;
  }
`;

const HeadingBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  button {
    text-transform: capitalize;
  }
  a {
    margin: 0px;
    font-weight: 600;
    line-height: 1.57143;
    font-size: 0.875rem;
    font-family: 'Public Sans', sans-serif;
    color: ${({ theme }) => theme.palette.secondary.main};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    text-transform: capitalize;
  }
`;
const ErrorList = styled.ul`
  color: ${({ theme }) => theme.palette.error.main};
  margin: 0px;
  margin-top: -15px;
  list-style: inside;
  font-size: 0.8rem;
  padding-left: 0;
`;
const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'white' : 'black'};
  }
`;

export default Login;
