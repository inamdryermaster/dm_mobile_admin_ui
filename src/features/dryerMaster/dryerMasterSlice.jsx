import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';

const initialState = {
  // dryerMaster
  dryerMaster: '',
  // Inlet Moisture
  inletMoisture: '',
  inletMoistureTemp: '',
  inletMoistureWarning: '',
  inletMoistureAlarm: '',
  // Outlet Moisture
  outletMoisture: '',
  outletMoistureTemp: '',
  outletMoistureWarning: '',
  outletMoistureAlarm: '',
  // Rate Control
  rateControl: '',
  rateControlWarning: '',
  rateControlAlarm: '',
  // Drying Temp
  dryingTemp: '',
  dryingTempWarning: '',
  dryingTempAlarm: '',

  isLoading: false,
};
export const dryerMastersThunk = createAsyncThunk(
  'dryerMasters/dryerMastersThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/home');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const dryerMastersSlice = createSlice({
  name: 'dryerMasters',
  initialState,
  reducers: {
    getDryerMasterStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(dryerMastersThunk.pending, (state, { payload }) => {
        console.log('promise pending');
        state.isLoading = true;
      })
      .addCase(dryerMastersThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(dryerMastersThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      });
  },
});
export const { getDryerMasterStateValues } = dryerMastersSlice.actions;

export default dryerMastersSlice.reducer;
