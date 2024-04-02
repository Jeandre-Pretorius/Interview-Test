import { configureStore } from '@reduxjs/toolkit';
import populationReducer from './populationSlice';
import damReducer from './damSlice';

export const store = configureStore({
  reducer: {
    population: populationReducer,
    dams: damReducer,
  },
});
