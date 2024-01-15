import React, { useEffect } from 'react';
import { CharacterList } from '../components/CharacterList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getData } from '../api/fetchClient';
import { Movie } from '../types/Movie';
import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess } from '../redux/moviesSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.movies.error);
  const movies = useAppSelector((state) => state.movies.data);

  useEffect(() => {
    if (movies.length > 0) {
      return;
    }
  
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
  }, [dispatch, movies.length]);

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <CharacterList />
  )
}

