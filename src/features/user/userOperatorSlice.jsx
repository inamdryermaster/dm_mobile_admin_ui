import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies } from './lib';
import { handleGlobalError } from '../../lib/handleGlobalError';
import { toast } from 'react-toastify';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  users: [],
  removedUsers: [],
  operatorId: '',
  deleteId: '',
  deleteName: '',
  isLoading: false,
  isLoadingRegister: false,
  isLoadingDelete: false,
  isLoadingEdit: false,
  refreshData: false,
  openDialog: false,
  showDeleteDialog: false,
  openEditDialog: false,
};
export const operatorsThunk = createAsyncThunk(
  'operators/operatorsThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/user/all_operators', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const operatorsRefreshThunk = createAsyncThunk(
  'operators/operatorsRefreshThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get('/user/all_operators', {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
export const operatorsRegisterThunk = createAsyncThunk(
  'operators/operatorsRegisterThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    const { operators } = thunkAPI.getState();

    try {
      const response = await customFetch.post(
        '/user/add_operator',
        { ...operators },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(operatorsRefreshThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

export const operatorsDeactivateThunk = createAsyncThunk(
  'operators/operatorsDeactivateThunk',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');

    try {
      const response = await customFetch.put(
        `/user/deactivate_operator/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(operatorsRefreshThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

export const operatorsEditThunk = createAsyncThunk(
  'operators/operatorsEditThunk',
  async (_, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');
    const { operators } = thunkAPI.getState();

    try {
      const response = await customFetch.put(
        `/user/edit_operator`,
        { ...operators },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(operatorsRefreshThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

export const reactiveOperatorThunk = createAsyncThunk(
  'operators/reactiveOperatorThunk',
  async (id, thunkAPI) => {
    const token = getUserCookies('dryermaster_token');

    try {
      const response = await customFetch.put(
        `/user/reactive_operator/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      thunkAPI.dispatch(operatorsRefreshThunk());
      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);
const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    getUserOperatorStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(operatorsThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(operatorsThunk.fulfilled, (state, { payload }) => {
        state.users = payload.data.filter((item) => item.active === true);
        state.removedUsers = payload.data.filter(
          (item) => item.active === false
        );
        state.isLoading = false;
      })
      .addCase(operatorsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(operatorsRefreshThunk.pending, (state, { payload }) => {})
      .addCase(operatorsRefreshThunk.fulfilled, (state, { payload }) => {
        state.users = payload.data.filter((item) => item.active === true);
        state.removedUsers = payload.data.filter(
          (item) => item.active === false
        );
      })
      .addCase(operatorsRefreshThunk.rejected, (state, { payload }) => {})
      .addCase(operatorsRegisterThunk.pending, (state, { payload }) => {
        state.isLoadingRegister = true;
      })
      .addCase(operatorsRegisterThunk.fulfilled, (state, { payload }) => {
        toast.success('Operator added successfully');
        state.isLoadingRegister = false;
        state.openDialog = false;
        state.firstName = '';
        state.lastName = '';
        state.email = '';
        state.password = '';
      })
      .addCase(operatorsRegisterThunk.rejected, (state, { payload }) => {
        state.isLoadingRegister = false;
      })
      .addCase(operatorsDeactivateThunk.pending, (state, { payload }) => {
        state.isLoadingDelete = true;
      })
      .addCase(operatorsDeactivateThunk.fulfilled, (state, { payload }) => {
        toast.success('Operator deactivated successfully');
        state.isLoadingDelete = false;
        state.showDeleteDialog = false;
      })
      .addCase(operatorsDeactivateThunk.rejected, (state, { payload }) => {
        state.isLoadingDelete = false;
      })
      .addCase(operatorsEditThunk.pending, (state, { payload }) => {
        state.isLoadingEdit = true;
      })
      .addCase(operatorsEditThunk.fulfilled, (state, { payload }) => {
        toast.success('Operator updated successfully');
        state.isLoadingEdit = false;
        state.openEditDialog = false;
        state.firstName = '';
        state.lastName = '';
        state.email = '';
        state.password = '';
      })
      .addCase(operatorsEditThunk.rejected, (state, { payload }) => {
        state.isLoadingEdit = false;
      })
      .addCase(reactiveOperatorThunk.pending, (state, { payload }) => {
        state.isLoadingEdit = true;
      })
      .addCase(reactiveOperatorThunk.fulfilled, (state, { payload }) => {
        toast.success('Operator reactivated successfully');
        state.isLoadingEdit = false;
      })
      .addCase(reactiveOperatorThunk.rejected, (state, { payload }) => {
        state.isLoadingEdit = false;
      });
  },
});
export const { getUserOperatorStateValues } = operatorsSlice.actions;

export default operatorsSlice.reducer;
