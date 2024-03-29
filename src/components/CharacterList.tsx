import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, Typography, ListItemText } from '@mui/material';
import { getAllPeople } from '../api/apiService';
import { People } from '../types/People';
import { CharacterCard } from './CharacterCard';
import { filterPeople } from '../utils/filterPeople';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  fetchCharactersComplete,
} from '../redux/peopleSlice';
import { Loader } from '../features/Loader';

export const CharacterList = () => {
  const [progress, setProgress] = useState(0);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const gender = searchParams.get('gender') || '';
  const movie = searchParams.get('movie') || '';
  const minMass = searchParams.get('minMass') || '';
  const maxMass = searchParams.get('maxMass') || '';

  const dispatch = useAppDispatch();
  const {
    data: people,
    error,
    loading,
  } = useAppSelector((state) => state.people);
  const movies = useAppSelector((state) => state.movies.data);

  useEffect(() => {
    if (people.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        dispatch(fetchCharactersStart());

        let nextUrl: string | null = 'https://swapi.dev/api/people';

        while (nextUrl) {
          const data: People = await getAllPeople(nextUrl);
          const fetchedCharacters = data.results.length;

          dispatch(fetchCharactersSuccess(data.results));

          setProgress((prevProgress) => {
            const newProgress =
              prevProgress + (fetchedCharacters / data.count) * 100;
            return newProgress > 100 ? 100 : newProgress;
          });

          nextUrl = data.next;
        }
      } catch (error: any) {
        dispatch(fetchCharactersFailure(error.message));
        console.error(`Error fetching people: ${error}`);
      } finally {
        dispatch(fetchCharactersComplete());
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const filteredPeople = filterPeople({
    people,
    query,
    gender,
    minMass,
    maxMass,
    movie,
    movies,
  });

  return (
    <>
      {error && (
        <Typography variant="h6" gutterBottom color="error">
          Error: {error}
        </Typography>
      )}
      {loading && (
        <ListItemText>
          <Typography variant="h6" gutterBottom>
            Please wait until all characters come together...
          </Typography>
          <Loader value={progress} />
        </ListItemText>
      )}
      {!loading && !error && filteredPeople.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No matching results found...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredPeople.map((person) => (
            <Grid item xs={12} sm={4} md={4} lg={3}>
              <CharacterCard person={person} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
