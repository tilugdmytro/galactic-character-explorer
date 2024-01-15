import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from '../redux/moviesSlice';
import peopleSlice from '../redux/peopleSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    people: peopleSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
