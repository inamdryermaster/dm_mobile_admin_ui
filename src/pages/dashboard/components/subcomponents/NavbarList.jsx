import styled from '@emotion/styled';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { BsCreditCard, BsPersonVcard, BsPersonVideo } from 'react-icons/bs';
import {
  MdForwardToInbox,
  MdHistory,
  MdOutlineManageAccounts,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSystemStateValues } from '../../../../features/system/systemSlice';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { IoMdKey } from 'react-icons/io';
import { FaRegChartBar } from 'react-icons/fa';
import { AiOutlineSchedule } from 'react-icons/ai';
import { FaUserPlus } from 'react-icons/fa';

const initialState = {
  openUser: false,
  openAccount: false,
};

const NavbarList = () => {
  const { role } = useSelector((state) => state.user);
  const listItems = [
    {
      text: 'Dashboard',
      path: '/dashboard',
      icon: <AiOutlineDashboard size={28} />,
    },
    {
      text: 'Charts',
      path: '/dashboard/charts',
      icon: <FaRegChartBar size={28} />,
    },
    {
      text: 'History',
      path: '/dashboard/history',
      icon: <MdHistory size={28} />,
    },
    {
      text: 'Messages',
      path: '/dashboard/messages',
      icon: <MdForwardToInbox size={28} />,
    },
  ];

  const collapseItems = [
    {
      text: 'Profile',
      path: '/dashboard/user/profile',
      icon: <BsPersonVcard size={28} />,
    },
    {
      text: 'Change Password',
      path: '/dashboard/user/change-password',
      icon: <IoMdKey size={28} />,
    },
  ];
  // if role is admin, add admin menu items
  if (role === 'user') {
    collapseItems.push({
      text: 'Add Operators',
      path: '/dashboard/user/add-operator',
      icon: <FaUserPlus size={28} />,
    });
  }

  const collapseItems2 = [
    {
      text: 'Subscription',
      path: '/dashboard/account/subscription',
      icon: <AiOutlineSchedule size={28} />,
    },
  ];

  // if role is admin, add admin menu items
  if (role === 'user') {
    collapseItems2.push(
      {
        text: 'Billing',
        path: '/dashboard/account/billing',
        icon: <BsCreditCard size={28} />,
      },
      {
        text: 'Invoices',
        path: '/dashboard/account/invoice',
        icon: <FaFileInvoiceDollar size={28} />,
      }
    );
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [state, setState] = React.useState(initialState);
  const { openUser, openAccount } = state;

  const handleOpenUser = () => {
    setState({ ...state, openUser: !openUser });
  };

  const handleOpenAccount = () => {
    setState({ ...state, openAccount: !openAccount });
  };
  const closeNavbar = () => {
    dispatch(
      getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
    );
  };

  const handleLink = (path) => {
    navigate(path);
    closeNavbar();
  };
  return (
    <Wrapper>
      <List className='body'>
        {listItems.map((item, index) => {
          return (
            <ListItemButton
              key={index}
              component='a'
              className={location.pathname === item.path ? 'active' : ''}
              onClick={() => handleLink(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          );
        })}
        <Divider />
        <ListItemButton onClick={handleOpenUser}>
          <ListItemIcon>
            <BsPersonVideo size={28} />
          </ListItemIcon>
          <ListItemText primary='User' />
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={openUser}
          timeout='auto'
          unmountOnExit>
          <List
            component='div'
            disablePadding>
            {collapseItems.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  component='a'
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => handleLink(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <Divider />
        <ListItemButton onClick={handleOpenAccount}>
          <ListItemIcon>
            <MdOutlineManageAccounts size={28} />
          </ListItemIcon>
          <ListItemText primary='Account' />
          {openAccount ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse
          in={openAccount}
          timeout='auto'
          unmountOnExit>
          <List
            component='div'
            disablePadding>
            {collapseItems2.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  component='a'
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => handleLink(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <Divider />
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .active {
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? 'var(--primary-15)'
        : 'var(--primary-2)'} !important;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? '#ffffff'
        : 'var(--primary-text)'} !important;

    // icon color change
    .MuiListItemIcon-root {
      color: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? '#ffffff'
          : 'var(--primary-text)'} !important;
    }
    span {
      font-weight: 600;
    }
  }
  .MuiListItemButton-root {
    border-radius: 10px;
    transition: all 0.3s ease;
    margin-bottom: 5px;
    max-height: 50px;
    overflow: hidden;
  }
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  .MuiListItemText-root {
    margin-left: 10px;
  }
  .MuiCollapse-wrapperInner {
    /* padding-left: 10px; */
  }
`;

export default NavbarList;
