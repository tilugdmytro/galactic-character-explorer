import React, { useEffect, useState } from 'react';
import { Context } from '../types/Context';
import { ProviderProps } from '../types/ProviderProps';
import { Movie } from '../types/Movie';
import { getData } from '../api/fetchClient';

export const GlobalContext = React.createContext<Context>({
  movies: [],
});

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getData<{ results: Movie[] }>('/films');

        setMovies(moviesData.results);
      } catch (error) {
        throw new Error(`Error fetching films data: ${error}`);
      }
    };

    fetchMovies();
  }, []);

  const value = {
    movies,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
