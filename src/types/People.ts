import { Character } from './Character';

export interface People {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
