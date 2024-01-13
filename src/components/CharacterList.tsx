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

  const processPeopleData = (data: People): Character[] => {
    setPeople((prevPeople) => {
      const lastId =
        prevPeople.length > 0 ? prevPeople[prevPeople.length - 1].id : 0;

      return [
        ...prevPeople,
        ...Object.values(data.results).map((value, index) => ({
          ...value,
          id: lastId + index + 1,
        })),
      ];
    });

    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let nextUrl: string | null = '/people';

        while (nextUrl) {
          // eslint-disable-next-line no-await-in-loop
          const data: People = await getAllPeople(
            nextUrl.replace('https://swapi.dev/api', '')
          );

          processPeopleData(data);

          nextUrl = data.next;
        }
      } catch (error) {
        throw new Error(`Error fetching people: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().finally(() => setIsLoading(false));
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
      <div>
        {!isLoading && filteredPeople.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            No matching results found...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredPeople.map((person) => (
              <Grid item key={person.id} xs={12} sm={4} md={4} lg={3}>
                <CharacterCard person={person} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};
