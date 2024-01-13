import { People } from '../types/People';
import { Character } from '../types/Character';
import { getData } from './fetchClient';

export const getAllPeople = (url: string): Promise<People> =>
  getData<People>(url);

export const getCharacterById = (id: number) =>
  getData<Character>(`/people/${id}`);
