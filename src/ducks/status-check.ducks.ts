import { RootStateT } from '@/redux/store';
import LoopringApi from '@/services/LoopringApi.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type StatusCheckState = {
  status: 'ACTIVE' | 'INACTIVE';
  loading: boolean;
  message?: string;
  error?: string;
};

const initialState: StatusCheckState = {
  status: 'INACTIVE',
  loading: false,
};

export const getStatus = createAsyncThunk('GET_STATUS_CHECK', async () => {
  const response = await new LoopringApi().getStatusCheck();
  console.log('response status');
  console.log(response);
  return response;
});

export const statusCheckReducer = createSlice({
  name: 'statusCheck',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state, { payload }) => {
        state.status = payload ? 'ACTIVE' : 'INACTIVE';
      })
      .addCase(getStatus.rejected, (state) => {
        state.error = 'Failed to get status';
      });
  },
});

export const selectStatusCheck = (state: RootStateT) => state.statusCheck;
export default statusCheckReducer.reducer;
