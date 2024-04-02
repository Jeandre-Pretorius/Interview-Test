import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopulation = createAsyncThunk(
  'population/fetchPopulation',
  async () => {
    const response = await fetch(process.env.REACT_APP_API_URL+'/ZA_populations');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.reduce((total, item) => {
      // Attempt to parse the population, default to 0 if NaN
      const population = parseInt(item.population, 10);
      return total + (isNaN(population) ? 0 : population);
    }, 0);
  }
);

export const populationSlice = createSlice({
  name: 'population',
  initialState: {
    totalPopulation: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPopulation.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPopulation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalPopulation = action.payload;
      })
      .addCase(fetchPopulation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default populationSlice.reducer;
