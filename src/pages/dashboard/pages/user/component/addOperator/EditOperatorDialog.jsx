import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsEditThunk,
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
  CircularProgress,
  Typography,
} from '@mui/material';

const initialState = {
  passwordError: false,
  passwordRequirements: {
    minLength: false,
    oneCapital: false,
    oneNumber: false,
  },
};

const EditOperatorDialog = () => {
  const {
    openEditDialog,
    firstName,
    lastName,
    email,
    password,
    isLoadingEdit,
  } = useSelector((state) => state.operators);
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

  const handleClose = () => {
    dispatch(
      getUserOperatorStateValues({ name: 'openEditDialog', value: false })
    );
    dispatch(getUserOperatorStateValues({ name: 'operatorId', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'firstName', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'lastName', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'email', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'password', value: '' }));
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
        passwordError:
          value.length > 0 && !(minLength && oneCapital && oneNumber),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password.length > 0 &&
      (!state.passwordRequirements.minLength ||
        !state.passwordRequirements.oneCapital ||
        !state.passwordRequirements.oneNumber)
    ) {
      setState({ ...state, passwordError: true });
      return;
    }
    dispatch(operatorsEditThunk());
  };

  return (
    <Wrapper>
      <Dialog
        open={openEditDialog}
        onClose={handleClose}>
        <DialogTitle>Edit Operator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to edit an operator.
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
              label='New Password'
              type='password'
              fullWidth
              value={password}
              error={state.passwordError}
              helperText={
                state.passwordError && 'Please meet all password requirements'
              }
              onChange={handleChange}
            />
            {password.length > 0 && (
              <PasswordRequirements requirements={state.passwordRequirements} />
            )}
            <DialogActions>
              <Button
                onClick={handleClose}
                variant='outlined'>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'>
                {isLoadingEdit ? <CircularProgress size={24} /> : 'Update'}
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

PasswordRequirements.propTypes = {
  requirements: PropTypes.shape({
    minLength: PropTypes.bool,
    oneCapital: PropTypes.bool,
    oneNumber: PropTypes.bool,
  }).isRequired,
};
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export default EditOperatorDialog;
