import styled from '@emotion/styled';
import { AccountCircle } from '@mui/icons-material';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  anchorEl: null,
};
const UserCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState(initialState);
  const { anchorEl, firstName, lastName, email } = state;

  const handleMenu = (event) => {
    const firstName = Cookies.get('dryermaster_firstName');
    const lastName = Cookies.get('dryermaster_lastName');
    const email = Cookies.get('dryermaster_email');
    setState({
      ...state,
      anchorEl: event.currentTarget,
      firstName,
      lastName,
      email,
    });
  };
  const handleClose = (e) => {
    setState({ ...state, anchorEl: null });
    if (e === 'profile') {
      navigate('/dashboard/user/profile');
    } else if (e === 'inbox') {
      navigate('/dashboard/messages');
    }
  };
  return (
    <Wrapper>
      {' '}
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'>
        <AccountCircle fontSize='large' />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <NameEmail>
          <p>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </p>
          <p>{email}</p>
        </NameEmail>
        <Divider />
        <MenuItem onClick={() => handleClose('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose('inbox')}>Inbox</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => dispatch(signOut())}
          className='logout'
          sx={{
            // color if theme mode is dark only than red
            color: (theme) =>
              theme.palette.mode !== 'dark' ? 'red' : 'inherit',
          }}>
          Logout
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0rem 16px;
  }
  p:first-of-type {
    display: flex;

    align-items: center;
    gap: 0.5rem;
    span {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
  //last child
  p:last-child {
    margin-top: 0rem;
    color: #808080;
  }
`;
export default UserCard;
