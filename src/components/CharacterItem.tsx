import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCharacterById } from '../api/getData';
import { CustomLink } from '../features/CustomLink';
import { Character } from '../types/Character';
import { Species } from '../types/Species';
import { Movie } from '../types/Movie';
import { Spaceship } from '../types/Spaceships';
import { InfoList } from './InfoList';
import { getData } from '../api/fetchClient';

export const CharacterItem = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [species, setSpecies] = useState<Species[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [spaceships, setSpaceships] = useState<Spaceship[]>([]);

  const { characterId } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        if (characterId && isMounted) {
          const characterData = await getCharacterById(+characterId);

          if (characterData.species.length > 0 && isMounted) {
            try {
              const speciesData = await Promise.all(
                characterData.species.map(url => getData<Species>(url, false)),
              );

              setSpecies(speciesData);
            } catch (error) {
              throw new Error(`Error fetching species data: ${error}`);
            }
          }

          if (characterData.films.length > 0 && isMounted) {
            try {
              const filmsData = await Promise.all(
                characterData.films.map(url => getData<Movie>(url, false)),
              );

              setMovies(filmsData);
            } catch (error) {
              throw new Error(`Error fetching films data: ${error}`);
            }
          }

          if (characterData.starships.length > 0 && isMounted) {
            try {
              const starshipsData = await Promise.all(
                characterData.starships.map(url => getData<Spaceship>(url, false)),
              );

              setSpaceships(starshipsData);
            } catch (error) {
              throw new Error(`Error fetching starships data: ${error}`);
            }
          }

          if (isMounted) {
            setCharacter(characterData);
          }
        }
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [characterId]);

  return (
    <>
      <CustomLink to="/">
        <IconButton color="secondary">
          <ArrowBackIcon />
        </IconButton>
      </CustomLink>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Box>
          <Card
            sx={{
              padding: '20px',
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ textAlign: 'center' }}
              >
                {character?.name}
              </Typography>
              <Divider sx={{ borderColor: 'secondary.main', mb: 2 }} />
              <InfoList
                title="Species"
                items={species.map((s) => ({ name: s.name }))}
                itemKey="name"
              />
              <InfoList
                title="Movies"
                items={movies.map((m) => ({ title: m.title }))}
                itemKey="title"
              />
              <InfoList
                title="Spaceships"
                items={spaceships.map((s) => ({ name: s.name }))}
                itemKey="name"
              />
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
};
