import { Character } from '../types/Character';
import { Movie } from '../types/Movie';

interface FilterPeopleParams {
  people: Character[];
  query: string;
  gender: string;
  minMass: string;
  maxMass: string;
  movie: string;
  movies: Movie[];
}

export const filterPeople = ({
  people, query, gender, minMass, maxMass, movie, movies,
}: FilterPeopleParams) => {
  let result = [...people];

  if (query) {
    result = result.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()));
  }

  if (gender) {
    if (gender !== 'Other') {
      result = result.filter(person => person.gender === gender.toLowerCase());
    } else {
      result = result.filter(person => person.gender !== 'male' && person.gender !== 'female');
    }
  }

  if (minMass || maxMass) {
    if (minMass) {
      result = result.filter(person => person.mass >= minMass);
    }

    if (maxMass) {
      result = result.filter(person => person.mass <= maxMass);
    }
  }

  if (movie) {
    const searchedMovie = movies.find(film => film.title === movie);

    result = result.filter(person => searchedMovie?.characters.includes(person.url));
  }

  return result;
};
