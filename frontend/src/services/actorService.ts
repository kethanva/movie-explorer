import { apiClient } from './api';
import { Actor, PaginatedResponse } from '../types';

// Fetch paginated actors
export const getActors = async (params?: {
  movie_id?: number;
  genre_id?: number;
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<Actor>> => {
  const response = await apiClient.get<PaginatedResponse<Actor>>('/api/actors', { params });
  return response.data;
};

// Fetch actor by id
export const getActorById = async (id: number): Promise<Actor> => {
  const response = await apiClient.get<Actor>(`/api/actors/${id}`);
  return response.data;
};
