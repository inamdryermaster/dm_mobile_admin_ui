import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';

const initialState = {
  //dialog states
  moistureSetPointDialog: false,
  rateSetPointDialog: false,
  modeControlDialog: false,
  //Current state values
  moistureSetPoint: 15,
  rateSetPoint: 35,
  modeControl: 'automatic',
  // Desired state values
  desiredMoistureSetPoint: '',
  desiredRateSetPoint: '',
  desiredModeControl: '',
  // Loading state
  isLoading: false,
};
export const homeThunk = createAsyncThunk(
  'home/homeThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getHomeStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(homeThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(homeThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(homeThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getHomeStateValues } = homeSlice.actions;

export default homeSlice.reducer;
