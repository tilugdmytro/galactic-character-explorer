import { RootState } from '../app/store';
import { Character } from '../types/Character';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PeopleState {
  data: Character[];
  error: string | null;
  loading: boolean;
}

const initialState: PeopleState = {
  data: [],
  error: null,
  loading: false,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchCharactersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
      state.data = [...state.data, ...action.payload];
      state.error = null;
    },
    fetchCharactersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchCharactersComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  fetchCharactersComplete,
} = peopleSlice.actions;

export const selectPeople = (state: RootState) => state.people.data;
export const selectPeopleError = (state: RootState) => state.people.error;

export default peopleSlice.reducer;
