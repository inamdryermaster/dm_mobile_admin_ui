import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';

const mode = localStorage.getItem('mode');

const initialState = {
  isLoading: false,
  mode: mode ? mode : 'light',
};
export const localStorageThunk = createAsyncThunk(
  'localStorage/localStorageThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const localStorageSlice = createSlice({
  name: 'localStorage',
  initialState,
  reducers: {
    getStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(localStorageThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        console.log(payload);
        state.isLoading = true;
      })
      .addCase(localStorageThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(localStorageThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getStateValues } = localStorageSlice.actions;

export default localStorageSlice.reducer;
