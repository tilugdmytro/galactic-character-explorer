import { People } from '../types/People';
import { Character } from '../types/Character';
import { getData } from './fetchClient';

export const getAllPeople = (url: string): Promise<People> =>
  getData<People>(url, false);

export const getCharacterById = (id: string) =>
  getData<Character>(`/people/${id}`);

  