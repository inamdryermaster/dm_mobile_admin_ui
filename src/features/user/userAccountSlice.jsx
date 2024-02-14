import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies, setUserCookies, updateUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';
import { userSubscriptionStatusThunk } from './userSlice';

const initialState = {
  paymentCards: [],
  showNewCard: false,
  //================
  transactionHistory: [],
  hasMore: false,
  limit: 20,
  transactionLoading: false,
  //===============
  isLoading: false,
  renewLoading: false,
  removeLoading: false,
  isUpdating: false,
};
export const userAccountThunk = createAsyncThunk(
  'userAccount/userAccountThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const userAccountPaymentCardsThunk = createAsyncThunk(
  'userAccount/userAccountPaymentCardsThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/dryermaster/account/stripe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userAccountPaymentCardsRefreshThunk = createAsyncThunk(
  'userAccount/userAccountPaymentCardsRefreshThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/dryermaster/account/stripe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userAccountExistingPaymentThunk = createAsyncThunk(
  'userAccount/userAccountExistingPaymentThunk',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.post(
        '/dryermaster/account/stripe/charge',
        {
          paymentMethodId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(userSubscriptionStatusThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userAccountExistingPaymentDetachThunk = createAsyncThunk(
  'userAccount/userAccountExistingPaymentDetachThunk',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.post(
        '/dryermaster/account/stripe/detach',
        {
          paymentMethodId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      thunkAPI.dispatch(userAccountPaymentCardsRefreshThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userAccountTransactionHistory = createAsyncThunk(
  'userAccount/userAccountTransactionHistory',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    const { limit } = thunkAPI.getState().userAccount;
    try {
      const response = await customFetch.get(
        `/dryermaster/account/stripe/charges?limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    getUserAccountStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userAccountThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userAccountThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userAccountPaymentCardsThunk.fulfilled, (state, { payload }) => {
        state.paymentCards = payload.data.data;
        state.isLoading = false;
      })
      .addCase(userAccountPaymentCardsThunk.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(
        userAccountPaymentCardsRefreshThunk.pending,
        (state, { payload }) => {}
      )
      .addCase(
        userAccountPaymentCardsRefreshThunk.fulfilled,
        (state, { payload }) => {
          state.paymentCards = payload.data.data;
        }
      )
      .addCase(
        userAccountPaymentCardsRefreshThunk.rejected,
        (state, { payload }) => {
          console.log(payload);
        }
      )
      .addCase(
        userAccountExistingPaymentThunk.pending,
        (state, { payload }) => {
          state.renewLoading = true;
        }
      )
      .addCase(
        userAccountExistingPaymentThunk.fulfilled,
        (state, { payload }) => {
          toast.success(payload.message);
          state.renewLoading = false;
        }
      )
      .addCase(
        userAccountExistingPaymentThunk.rejected,
        (state, { payload }) => {
          console.log(payload);
          state.renewLoading = false;
        }
      )
      .addCase(
        userAccountExistingPaymentDetachThunk.pending,
        (state, { payload }) => {
          state.removeLoading = true;
        }
      )
      .addCase(
        userAccountExistingPaymentDetachThunk.fulfilled,
        (state, { payload }) => {
          toast.success(payload.message);
          state.removeLoading = false;
        }
      )
      .addCase(
        userAccountExistingPaymentDetachThunk.rejected,
        (state, { payload }) => {
          console.log(payload);
          state.removeLoading = false;
        }
      )
      .addCase(userAccountTransactionHistory.pending, (state, { payload }) => {
        state.transactionLoading = true;
      })
      .addCase(
        userAccountTransactionHistory.fulfilled,
        (state, { payload }) => {
          state.transactionHistory = payload.data;
          state.hasMore = payload.hasMore;
          state.transactionLoading = false;
        }
      )
      .addCase(userAccountTransactionHistory.rejected, (state, { payload }) => {
        console.log(payload);
        state.transactionLoading = false;
      });
  },
});
export const { getUserAccountStateValues } = userAccountSlice.actions;

export default userAccountSlice.reducer;
