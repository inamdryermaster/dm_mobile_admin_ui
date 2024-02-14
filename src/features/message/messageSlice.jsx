import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../lib/customeFetch';
import { getUserCookies } from '../user/lib';
import { handleGlobalError } from '../../lib/handleGlobalError';

const initialState = {
  messages: [],
  totalMessages: 0,
  totalPages: 0,
  messagePerPage: 0,
  page: 1,
  limit: 15,
  isDrawerOpen: false,
  readMessageId: '',
  readMessage: {},
  readMessageLoading: false,
  isLoading: false,
};
export const messagesThunk = createAsyncThunk(
  'messages/messagesThunk',
  async (_, thunkAPI) => {
    // get state values page and limit by thunkApi
    const { page, limit } = thunkAPI.getState().message;
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get(
        `/message/user?page=${page}&limit=${limit}
      `,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

export const readMessageThunk = createAsyncThunk(
  'messages/readMessageThunk',
  async (_, thunkAPI) => {
    const { readMessageId } = thunkAPI.getState().message;
    const token = getUserCookies('dryermaster_token');
    try {
      const response = await customFetch.get(`/message/user/${readMessageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return handleGlobalError(error, thunkAPI);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessageStateValues: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    toggleDrawer: (state, { payload }) => {
      state.isDrawerOpen = !state.isDrawerOpen;
      if (payload) {
        state.readMessageId = payload;
        // go in messages array and find the message with the same id as payload
        // and set the read property to true
        const message = state.messages.find(
          (message) => message._id === payload
        );
        message.readMessage = true;
      } else {
        state.readMessageId = '';
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(messagesThunk.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(messagesThunk.fulfilled, (state, { payload }) => {
        state.messages = [...state.messages, ...payload.result]; // append new messages
        state.totalMessages = payload.totalMessages;
        state.totalPages = payload.totalPages;
        state.page += 1; // increment page
        state.isLoading = false;
        state.hasMore = state.messages.length < state.totalMessages;
      })
      .addCase(messagesThunk.rejected, (state, { payload }) => {
        console.log('promise rejected');
        console.log(payload);
        state.isLoading = false;
      })
      .addCase(readMessageThunk.pending, (state, { payload }) => {
        state.readMessageLoading = true;
      })
      .addCase(readMessageThunk.fulfilled, (state, { payload }) => {
        state.readMessage = payload.data;
        state.readMessageLoading = false;
      })
      .addCase(readMessageThunk.rejected, (state, { payload }) => {
        state.readMessageLoading = false;
      });
  },
});
export const { getMessageStateValues, toggleDrawer } = messagesSlice.actions;

export default messagesSlice.reducer;
