import { People } from '../types/People';
import { Character } from '../types/Character';
import { getData } from './fetchClient';

export const getAllPeople = (url: string): Promise<People> => {
  const apiUrl = url || '/people';

  return getData<People>(apiUrl);
};

export const getCharacterById = (id: number) => getData<Character>(`/people/${id}`);
