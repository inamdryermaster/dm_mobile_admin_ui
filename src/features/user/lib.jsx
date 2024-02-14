import Cookies from 'js-cookie';
import { capitalize } from '../../lib/helpers';
import { toast } from 'react-toastify';
import { getUserStateValues, userSubscriptionStatusThunk } from './userSlice';

// Utility function to set a cookie
export const setCookie = (name, value, options = {}) => {
  const defaults = { expires: 30, secure: true, sameSite: 'none' };
  const finalOptions = { ...defaults, ...options };
  Cookies.set(name, value, finalOptions);
};

// =================== Redux functions ===================
// Example usage within your thunks
export const setUserCookies = (userData) => {
  const {
    role,
    firstName,
    lastName,
    email,
    token,
    dmSerial,
    dmModel,
    subscriptionExpiry,
  } = userData;
  setCookie('dryermaster_role', role);
  setCookie('dryermaster_firstName', firstName);
  setCookie('dryermaster_lastName', lastName);
  setCookie('dryermaster_email', email);
  setCookie('dryermaster_token', token);
  setCookie('dryermaster_dmSerial', dmSerial);
  setCookie('dryermaster_dmModel', dmModel);
  setCookie('dryermaster_subscriptionExpiry', subscriptionExpiry);
};

export const updateUserCookies = (userData) => {
  const { firstName, lastName, email } = userData;
  setCookie('dryermaster_firstName', firstName);
  setCookie('dryermaster_lastName', lastName);
  setCookie('dryermaster_email', email);
};

// =================== Redux functions ===================

// Utility function to remove user cookies
export const removeUserCookies = () => {
  Cookies.remove('dryermaster_token');
  Cookies.remove('dryermaster_role');
  Cookies.remove('dryermaster_firstName');
  Cookies.remove('dryermaster_lastName');
  Cookies.remove('dryermaster_email');
  Cookies.remove('dryermaster_dmSerial');
  Cookies.remove('dryermaster_dmModel');
  Cookies.remove('dryermaster_subscriptionExpiry');
};

export const getUserCookies = (name) => {
  const value = Cookies.get(name);
  if (!value) {
    console.log(`No cookie found for ${name}`);
    removeUserCookies();
    return null;
  }
  return value;
};

// =================== Redux functions ===================

// Utility function to produce goodby message
export const goodbyeMessage = () => {
  const firstName = Cookies.get('dryermaster_firstName') || '';
  const lastName = Cookies.get('dryermaster_lastName') || '';
  const capitalizedFirstName = firstName ? capitalize(firstName) : '';
  const capitalizedLastName = lastName ? capitalize(lastName) : '';
  const goodbyeMessage = `Goodbye ${capitalizedFirstName} ${capitalizedLastName} 👋🏼`;
  toast.info(goodbyeMessage);
};

// =================== Redux functions ===================

export const subscriptionExpiryCheck = async (dispatch) => {
  const expiryDate = getUserCookies('dryermaster_subscriptionExpiry');
  if (!expiryDate) {
    return;
  }
  const now = new Date();
  const expiry = new Date(expiryDate);
  if (expiry < now) {
    dispatch(userSubscriptionStatusThunk());
    dispatch(
      getUserStateValues({ name: 'subscriptionExpiry', value: expiryDate })
    );
    return;
  } else {
    dispatch(getUserStateValues({ name: 'isSubscriptionActive', value: true }));
    dispatch(
      getUserStateValues({ name: 'subscriptionExpiry', value: expiryDate })
    );
  }
};

// =================== Redux functions ===================
