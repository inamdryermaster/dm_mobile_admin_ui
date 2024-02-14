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
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useFormValidation from '../../../hooks/useFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterThunk } from '../../../features/user/userSlice';
import CardWrapper from '../../../styles/wrappers/CardWrapper';

const RegisterUserDetails = () => {
  const { isLoading, dmSerial, dryermasterId } = useSelector(
    (state) => state.user
  );
  const [farmName, setFarmName] = useState('');
  const dispatch = useDispatch();

  const {
    formState,
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    handleChange,
  } = useFormValidation();
  const {
    firstName,
    lastName,
    email,
    password,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    firstNameErrorList,
    lastNameErrorList,
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

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid
    ) {
      dispatch(
        userRegisterThunk({
          firstName,
          lastName,
          farmName,
          email,
          password,
          dmSerial,
          dryermasterId,
        })
      );
    }
  };

  return (
    <Wrapper>
      <CardWrapper>
        <Heading>
          <div className='title'>Register Account</div>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              Already have an account?
            </Typography>
            <Link to='/'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Sign in
              </Typography>
            </Link>
          </HeadingBody>
          <Typography
            variant='h4'
            className='serial'>
            SN # <span>{dmSerial}</span>
          </Typography>
        </Heading>

        <form onSubmit={handleSubmit}>
          <Body>
            <div className='name'>
              <div className='first-name'>
                <TextField
                  fullWidth
                  label='First Name'
                  type='text'
                  variant='outlined'
                  name='firstName'
                  value={firstName}
                  onChange={handleFieldChange}
                  error={firstNameError}
                  required
                />
                {firstNameError && (
                  <ErrorList>
                    {firstNameErrorList.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ErrorList>
                )}
              </div>
              <div className='last-name'>
                <TextField
                  fullWidth
                  label='Last Name'
                  type='text'
                  variant='outlined'
                  name='lastName'
                  value={lastName}
                  onChange={handleFieldChange}
                  error={lastNameError}
                  required
                />
                {lastNameError && (
                  <ErrorList>
                    {lastNameErrorList.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ErrorList>
                )}
              </div>
            </div>
            <TextField
              fullWidth
              label='Farm Name'
              type='text'
              variant='outlined'
              name='farmName'
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />

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
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </Body>
        </form>
        <div className='policy'>
          <Typography variant='body2'>
            By signing in, you agree to DryerMaster&apos;s
            <Link to='/'>Privacy Policy</Link> and{' '}
            <Link href='/'>Terms of Use</Link>.
          </Typography>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  .policy {
    margin-top: 20px;
    text-align: center;
    p {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.palette.grey[600]};
    }

    a {
      color: ${({ theme }) => theme.palette.secondary.main};
      font-weight: 400;
      padding-left: 4px;
      text-decoration: none;

      :hover {
        text-decoration: underline;
      }
    }
  }
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
  .serial {
    margin: 0px;
    font-weight: 500;
    line-height: 1.5;
    font-size: 1.3rem;
    font-family: 'Public Sans', sans-serif;

    span {
      color: ${({ theme }) => theme.palette.secondary.main};
      font-weight: 700;
    }
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

const ErrorList = styled.ul`
  color: ${({ theme }) => theme.palette.error.main};
  margin: 0px;
  margin-top: -15px;
  list-style: inside;
  font-size: 0.8rem;
  padding-left: 0;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .name {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    .first-name {
      li {
        margin-top: 20px;
      }
    }
    .last-name {
      li {
        margin-top: 20px;
      }
    }
  }
  button {
    text-transform: capitalize;
  }
`;

export default RegisterUserDetails;
