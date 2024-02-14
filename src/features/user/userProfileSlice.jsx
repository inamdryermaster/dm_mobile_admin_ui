import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies, setUserCookies, updateUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  farmName: '',
  email: '',
  cellPhone: '',
  createdAt: '',
  // address
  formattedAddress: '',
  apartment: '',
  building: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  latitude: null,
  longitude: null,
  isLoading: false,
  isUpdating: false,
};
export const userProfileThunk = createAsyncThunk(
  'userProfile/userProfileThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userProfileReadThunk = createAsyncThunk(
  'userProfile/userProfileReadThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserCookies('dryermaster_token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const userProfileUpdateThunk = createAsyncThunk(
  'userProfile/userProfileUpdateThunk',
  async (_, thunkAPI) => {
    const { userProfile } = thunkAPI.getState();
    const firstName = getUserCookies('dryermaster_firstName');
    const lastName = getUserCookies('dryermaster_lastName');
    const email = getUserCookies('dryermaster_email');
    if (
      firstName !== userProfile.firstName ||
      lastName !== userProfile.lastName ||
      email !== userProfile.email
    ) {
      updateUserCookies(userProfile);
    }
    try {
      const response = await customFetch.put('/user/profile', userProfile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserCookies('dryermaster_token')}`,
        },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    getUserProfileStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userProfileThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(userProfileThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userProfileThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userProfileReadThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(userProfileReadThunk.fulfilled, (state, { payload }) => {
        state.firstName = payload.data.firstName || '';
        state.lastName = payload.data.lastName || '';
        state.role = payload.data.role || '';
        state.farmName = payload.data.farmName || '';
        state.email = payload.data.email || '';
        state.cellPhone = payload.data?.cellPhone || '';
        state.createdAt = payload.data.createdAt || '';
        state.formattedAddress = payload.data?.address?.formattedAddress || '';
        state.apartment = payload.data?.address?.apartment || '';
        state.building = payload.data?.address?.building || '';
        state.street = payload.data?.address?.street || '';
        state.city = payload.data?.address?.city || '';
        state.state = payload.data?.address?.state || '';
        state.country = payload.data?.address?.country || '';
        state.zipCode = payload.data?.address?.zipCode || '';
        state.latitude =
          payload.data?.address?.location?.coordinates[1] || null;
        state.longitude =
          payload.data?.address?.location?.coordinates[0] || null;
        state.isLoading = false;
      })
      .addCase(userProfileReadThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(userProfileUpdateThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isUpdating = true;
      })
      .addCase(userProfileUpdateThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isUpdating = false;
      })
      .addCase(userProfileUpdateThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isUpdating = false;
      });
  },
});
export const { getUserProfileStateValues } = userProfileSlice.actions;

export default userProfileSlice.reducer;
