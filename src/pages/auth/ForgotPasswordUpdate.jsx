import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFormValidation from '../../hooks/useFormValidation';
import sendEmail from '../../assets/images/change-password.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import {
  userForgotPasswordThunk,
  userForgotPasswordUpdateThunk,
} from '../../features/user/userSlice';

const ForgotPasswordUpdate = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [state, setState] = useState({
    email: '',
    token: '',
    confirmPassword: '',
    disableToken: false,
  });
  const { email, token } = state;

  const { formState, validatePassword, handleChange } = useFormValidation();
  const {
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
    const isPasswordValid = validatePassword(password);
    if (
      isPasswordValid &&
      !emailError &&
      token &&
      password === state.confirmPassword
    ) {
      dispatch(userForgotPasswordUpdateThunk({ email, token, password }));
    }
  };

  const handleResendCode = () => {
    dispatch(userForgotPasswordThunk({ email }));
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');
    setState({ ...state, token, email });
  }, []);
  return (
    <Wrapper>
      <Container>
        <Heading>
          <img
            src={sendEmail}
            alt='lock'
            style={{ width: '120px', height: '120px', margin: '0px auto' }}
          />
          <Typography
            variant='h4'
            className='heading-title'>
            Change your password
          </Typography>
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
              disabled
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
            <TextField
              fullWidth
              label='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              name='confirmPassword'
              value={state.confirmPassword}
              onChange={(e) =>
                setState({ ...state, confirmPassword: e.target.value })
              }
              error={
                state.confirmPassword
                  ? state.confirmPassword !== password
                  : false
              }
              helperText={
                state.confirmPassword
                  ? state.confirmPassword !== password &&
                    'Password does not match'
                  : ''
              }
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
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'>
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    color='inherit'
                    style={{ marginRight: '10px' }} // Add some spacing between the spinner and the text
                  />
                  Updating...
                </>
              ) : (
                'Change Password'
              )}
            </Button>

            <div className='code'>
              <p>Need a fresh start?</p>
              <Button
                variant='text'
                color='primary'
                disabled={isLoading}
                onClick={handleResendCode}>
                Send Me a New Password Reset Link
              </Button>
            </div>
            <Link
              to='/'
              className='link'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                <ArrowBackIosIcon sx={{ fontSize: 'small', mr: '0px' }} />
                Return to sign in
              </Typography>
            </Link>
          </Body>
        </form>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 40px 24px;
  z-index: 0;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#333' : 'white'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
  .link {
    text-decoration: none;
    color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
    :hover {
      text-decoration: underline;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0px;
    }
    button {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  text-align: center;
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

export default ForgotPasswordUpdate;
