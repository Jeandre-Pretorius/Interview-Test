import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDams = createAsyncThunk(
  'dams/fetchDams',
  async () => {
    const response = await fetch(process.env.REACT_APP_API_URL+'/ZA_dams');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  }
);

export const damsSlice = createSlice({
  name: 'dams',
  initialState: {
    totalDams: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDams.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalDams = action.payload;
      })
      .addCase(fetchDams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default damsSlice.reducer;
