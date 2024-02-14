import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFormValidation from '../../../../hooks/useFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userChangePasswordThunk } from '../../../../features/user/userSlice';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';

const initialState = {
  confirmPassword: '',
  current_password: '',
  showCurrentPassword: false,
  showConfirmPassword: false,
};
const ForgotPasswordUpdate = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const {
    showConfirmPassword,
    showCurrentPassword,
    current_password,
    confirmPassword,
  } = state;

  const {
    formState,
    validatePassword,
    handleChange,
    setFormState,
    initialFormState,
  } = useFormValidation();
  const { password, passwordError, passwordErrorList } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    if (e === 'current_password') {
      setState({ ...state, showCurrentPassword: !state.showCurrentPassword });
    } else if (e === 'confirm_password') {
      setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
    } else {
      setShowPassword(!showPassword);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid && password === state.confirmPassword) {
      dispatch(
        userChangePasswordThunk({
          password: password,
          current_password: state.current_password,
          setState,
          initialState,
          setFormState,
          initialFormState,
        })
      );
    }
  };

  return (
    <Wrapper>
      <CardWrapper>
        <div className='title'>Change password</div>
        <form onSubmit={handleSubmit}>
          <Body>
            <TextField
              fullWidth
              label='Current password'
              type={showCurrentPassword ? 'text' : 'password'}
              variant='outlined'
              name='current_password'
              value={current_password}
              onChange={(e) =>
                setState({ ...state, current_password: e.target.value })
              }
              error={passwordError}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleShowPassword('current_password')}
                      edge='end'>
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {state.current_password && state.current_password.length < 8 && (
              <ErrorList>
                <li>Password must be at least 8 characters long</li>
              </ErrorList>
            )}
            <Divider
              sx={{
                margin: '10px 0',
              }}
            />
            <TextField
              fullWidth
              label='New password'
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
              label='Confirm new password'
              type={showConfirmPassword ? 'text' : 'password'}
              variant='outlined'
              name='confirmPassword'
              value={confirmPassword}
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
                      onClick={() => handleShowPassword('confirm_password')}
                      edge='end'>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
              size='large'
              disabled={isLoading}>
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
          </Body>
        </form>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
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
  /* min-height: 100vh; */
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
