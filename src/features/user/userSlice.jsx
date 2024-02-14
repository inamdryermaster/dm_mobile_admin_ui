import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { capitalize } from '@mui/material';
import { handleGlobalError } from '../../lib/handleGlobalError';
import {
  getUserCookies,
  goodbyeMessage,
  removeUserCookies,
  setUserCookies,
} from './lib';

const initialState = {
  firstName: '',
  lastName: '',
  isMember: Cookies.get('dryermaster_token') ? true : false,
  role: getUserCookies('dryermaster_role'),
  isDmRegistered: false,
  dmSerial: '',
  dmPassword: '',
  dryermasterId: '',
  isSubscriptionActive: false,
  subscriptionExpiry: '',
  isDmOnline: true,
  isLoading: false,
};
export const userThunk = createAsyncThunk(
  'user/userThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// this is for dryermaster login to get the dryermaster id
export const userDryermasterLoginThunk = createAsyncThunk(
  'user/userDryermasterLoginThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/login_dryermaster', user);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
// userRegisterThunk
export const userRegisterThunk = createAsyncThunk(
  'user/userRegisterThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/register', user);
      toast.success(
        `Welcome ${capitalize(response.data.firstName)} ${capitalize(
          response.data.lastName
        )}`
      );
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// userLoginThunk
export const userLoginThunk = createAsyncThunk(
  'user/userLoginThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/login', user);
      toast.success(
        `Welcome back ${capitalize(response.data.firstName)} ${capitalize(
          response.data.lastName
        )}`
      );
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// user change password thunk
export const userChangePasswordThunk = createAsyncThunk(
  'user/userChangePasswordThunk',
  async (user, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    const { setState, initialState, setFormState, initialFormState } = user;
    try {
      const response = await customFetch.put('/user/change_password', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(response.data.message);
      setState(initialState);
      setFormState(initialFormState);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// userForgotPasswordThunk
export const userForgotPasswordThunk = createAsyncThunk(
  'user/userForgotPasswordThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/user/forgot_password', user);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// userForgotPasswordUpdateThunk
export const userForgotPasswordUpdateThunk = createAsyncThunk(
  'user/userForgotPasswordUpdateThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.put(
        '/user/forgot_password_update',
        user
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

// user subscription status thunk

export const userSubscriptionStatusThunk = createAsyncThunk(
  'user/userSubscriptionStatusThunk',
  async (_, thunkAPI) => {
    try {
      const token = getUserCookies('dryermaster_token');
      const response = await customFetch.get('/user/subscription_status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    signOut: (state) => {
      state.isMember = false;
      goodbyeMessage();
      removeUserCookies();
    },
  },

  extraReducers: (builder) => {
    builder

      //  userThunk
      .addCase(userThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      //  userDryermasterLoginThunk
      .addCase(userDryermasterLoginThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userDryermasterLoginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isDmRegistered = true;
        state.dryermasterId = payload.dryermasterId;
      })
      .addCase(userDryermasterLoginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(userThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      //  userRegisterThunk
      .addCase(userRegisterThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userRegisterThunk.fulfilled, (state, { payload }) => {
        setUserCookies(payload);
        state.isMember = true;
        state.isLoading = false;
        state.role = payload.role;
      })
      .addCase(userRegisterThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userLoginThunk
      .addCase(userLoginThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state, { payload }) => {
        setUserCookies(payload);
        state.isLoading = false;
        state.isMember = true;
        state.role = payload.role;
      })
      .addCase(userLoginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userChangePasswordThunk
      .addCase(userChangePasswordThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userChangePasswordThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(userChangePasswordThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userForgotThunk
      .addCase(userForgotPasswordThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userForgotPasswordThunk.fulfilled, (state, { payload }) => {
        window.location.href = `/email-sent/${payload.email}`;
        state.isLoading = false;
      })
      .addCase(userForgotPasswordThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      //  userForgotPasswordUpdateThunk
      .addCase(userForgotPasswordUpdateThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(
        userForgotPasswordUpdateThunk.fulfilled,
        (state, { payload }) => {
          setUserCookies(payload);
          state.isLoading = false;
          state.isMember = true;
        }
      )
      .addCase(userForgotPasswordUpdateThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      //  userSubscriptionStatusThunk
      .addCase(userSubscriptionStatusThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userSubscriptionStatusThunk.fulfilled, (state, { payload }) => {
        const { isExpired, expiryDate } = payload;
        if (isExpired) {
          Cookies.set('dryermaster_subscriptionExpiry', expiryDate);
          state.subscriptionExpiry = expiryDate;
          state.isSubscriptionActive = false;
          state.isLoading = false;
          return;
        } else {
          Cookies.set('dryermaster_subscriptionExpiry', expiryDate);
          state.subscriptionExpiry = expiryDate;
          state.isSubscriptionActive = true;
          state.isLoading = false;
        }
      })
      .addCase(userSubscriptionStatusThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});
export const { getUserStateValues, signOut } = userSlice.actions;

export default userSlice.reducer;
