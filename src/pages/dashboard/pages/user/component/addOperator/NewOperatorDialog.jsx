import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsRegisterThunk,
} from '../../../../../../features/user/userOperatorSlice';
import styled from '@emotion/styled';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress,
} from '@mui/material';

const initialState = {
  passwordError: false,
  passwordRequirements: {
    minLength: false,
    oneCapital: false,
    oneNumber: false,
  },
};

const NewOperatorDialog = () => {
  const {
    openDialog,
    firstName,
    lastName,
    email,
    password,
    isLoadingRegister,
  } = useSelector((state) => state.operators);
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

  const handleClose = () => {
    dispatch(getUserOperatorStateValues({ name: 'openDialog', value: false }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(getUserOperatorStateValues({ name, value }));

    if (name === 'password') {
      const minLength = value.length >= 8;
      const oneCapital = /[A-Z]/.test(value);
      const oneNumber = /\d/.test(value);

      setState({
        ...state,
        passwordRequirements: { minLength, oneCapital, oneNumber },
        passwordError: !(minLength && oneCapital && oneNumber),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.passwordRequirements.minLength ||
      !state.passwordRequirements.oneCapital ||
      !state.passwordRequirements.oneNumber
    ) {
      setState({ ...state, passwordError: true });
      return;
    }
    dispatch(operatorsRegisterThunk());
  };

  return (
    <Wrapper>
      <Dialog
        open={openDialog}
        onClose={handleClose}>
        <DialogTitle>Add New Operator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details of the new operator.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin='dense'
              name='firstName'
              label='First Name'
              type='text'
              fullWidth
              required
              value={firstName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='lastName'
              label='Last Name'
              type='text'
              fullWidth
              required
              value={lastName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='email'
              label='Email Address'
              type='email'
              fullWidth
              required
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='password'
              label='Password'
              type='text'
              fullWidth
              required
              value={password}
              error={state.passwordError}
              onChange={handleChange}
            />
            {state.passwordError && (
              <Typography color='error'>
                Please meet all password requirements
              </Typography>
            )}
            <PasswordRequirements requirements={state.passwordRequirements} />
            <DialogActions>
              <Button
                onClick={handleClose}
                variant='outlined'>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'>
                {isLoadingRegister ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

import PropTypes from 'prop-types';

const PasswordRequirements = ({ requirements }) => (
  <List>
    <li style={{ color: requirements.minLength ? 'green' : 'black' }}>
      At least 8 characters
    </li>
    <li style={{ color: requirements.oneCapital ? 'green' : 'black' }}>
      At least one uppercase letter
    </li>
    <li style={{ color: requirements.oneNumber ? 'green' : 'black' }}>
      At least one number
    </li>
  </List>
);

const List = styled.ul`
  list-style: none;
  padding: 0;
`;
PasswordRequirements.propTypes = {
  requirements: PropTypes.shape({
    minLength: PropTypes.bool,
    oneCapital: PropTypes.bool,
    oneNumber: PropTypes.bool,
  }).isRequired,
};

export default NewOperatorDialog;
