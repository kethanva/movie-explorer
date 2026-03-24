import { apiClient } from './api';
import { Genre } from '../types';

/** Fetches the full list of available genres. */
export const getGenres = async (): Promise<Genre[]> => {
  const response = await apiClient.get<Genre[]>('/api/genres');
  return response.data;
};
