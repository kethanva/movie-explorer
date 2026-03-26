import { apiClient } from './api';
import { Genre } from '../types';

// Fetch all genres
export const getGenres = async (): Promise<Genre[]> => {
  const response = await apiClient.get<Genre[]>('/api/genres');
  return response.data;
};
