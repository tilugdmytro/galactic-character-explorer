import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, LinearProgress, Typography, ListItemText } from '@mui/material';
import { getAllPeople } from '../api/apiService';
import { Character } from '../types/Character';
import { People } from '../types/People';
import { CharacterCard } from './CharacterCard';
import { filterPeople } from '../utils/filterPeople';
import { useAppSelector } from '../app/hooks';

export const CharacterList = () => {
  const [people, setPeople] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const movies = useAppSelector((state) => state.movies.data);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const gender = searchParams.get('gender') || '';
  const movie = searchParams.get('movie') || '';
  const minMass = searchParams.get('minMass') || '';
  const maxMass = searchParams.get('maxMass') || '';

  const processPeopleData = (data: People): void => {
    setPeople((prevPeople) => [
      ...prevPeople,
      ...data.results.map((value) => ({ ...value })),
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let nextUrl: string | null = 'https://swapi.dev/api/people';

        while (nextUrl) {
          const data: People = await getAllPeople(nextUrl)

          processPeopleData(data);

          nextUrl = data.next;
        }
      } catch (error) {
        console.error(`Error fetching people: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    
    fetchData().finally(() => setIsLoading(false));
    return (() => console.log('unmount'))
  }, []);

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
      {isLoading && (
        <ListItemText>
          <Typography variant="h6" gutterBottom>
            Please wait until all characters come together...
          </Typography>
          <LinearProgress color="secondary" sx={{ mb: 2 }} />
        </ListItemText>
      )}
      <>
        {!isLoading && filteredPeople.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            No matching results found...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredPeople.map((person) => (
              <Grid item key={person.name} xs={12} sm={4} md={4} lg={3}>
                <CharacterCard person={person} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    </>
  );
};
