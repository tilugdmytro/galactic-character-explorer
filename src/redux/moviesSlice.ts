import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../types/Movie';

interface MoviesState {
  data: Movie[];
  error: string | null;
}

const initialState: MoviesState = {
  data: [],
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.error = null;
    },
    fetchMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.data = action.payload;
      state.error = null;
    },
    fetchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure } = moviesSlice.actions;
export default moviesSlice.reducer;
