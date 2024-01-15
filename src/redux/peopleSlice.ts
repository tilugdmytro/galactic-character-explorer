import { RootState } from '../app/store';
import { Character } from '../types/Character';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PeopleState {
  data: Character[];
  error: string | null;
}

const initialState: PeopleState = {
  data: [],
  error: null,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    fetchCharactersStart: (state) => {
      state.error = null;
    },
    fetchCharactersSuccess: (state, action: PayloadAction<Character[]>) => {
      state.data = [...state.data, ...action.payload];
      state.error = null;
    },
    fetchCharactersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} = peopleSlice.actions;

export const selectPeople = (state: RootState) => state.people.data;
export const selectPeopleError = (state: RootState) => state.people.error;

export default peopleSlice.reducer;
