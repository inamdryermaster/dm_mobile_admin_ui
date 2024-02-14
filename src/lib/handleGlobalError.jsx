import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeUserCookies } from '../features/user/lib';
import { getUserStateValues } from '../features/user/userSlice';

const CustomToast = ({ header, message }) => (
  <div>
    <strong>{header}</strong>
    <div>{message}</div>
  </div>
);

export const handleGlobalError = (error, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  let header = '';
  let message = '';
  toast.dismiss();
  if (!error.response) {
    header = 'Network Error';
    message = 'Please check your internet connection and try again.';
    toast.error(
      <CustomToast
        header={header}
        message={message}
      />
    );
    return thunkAPI.rejectWithValue({ message: header });
  }

  const status = error.response.status || 500;
  message = error.response.data.message || 'An error occurred';

  // Define headers for specific HTTP status codes
  switch (status) {
    case 400:
      header = 'Error 400';
      break;
    case 401:
      header = 'Error 401';
      removeUserCookies();
      dispatch(getUserStateValues({ name: 'isMember', value: false }));
      break;
    case 403:
      header = 'Error 403';
      break;
    case 404:
      header = 'Error 404';
      break;
    case 500:
      header = 'Error 500';
      break;
    case 503:
      header = 'Error 503';
      break;
    default:
      header = `Error ${status}`;
  }

  toast.error(
    <CustomToast
      header={header}
      message={message}
    />
  );
  return thunkAPI.rejectWithValue({ message, status });
};
