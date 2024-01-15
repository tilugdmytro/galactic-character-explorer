import React, { useEffect } from 'react';
import { CharacterList } from '../components/CharacterList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getData } from '../api/fetchClient';
import { Movie } from '../types/Movie';
import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess } from '../redux/moviesSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchMoviesStart());

        const moviesData = await getData<{ results: Movie[] }>('/films');

        dispatch(fetchMoviesSuccess(moviesData.results));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        dispatch(fetchMoviesFailure(errorMessage));
      }
    };

    fetchData();
  }, [dispatch]);

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <CharacterList />
  )
}

