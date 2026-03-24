import { apiClient } from './api';
import { Actor, PaginatedResponse } from '../types';

/** Fetches a paginated list of actors, optionally filtered by movie or genre. */
export const getActors = async (params?: {
  movie_id?: number;
  genre_id?: number;
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<Actor>> => {
  const response = await apiClient.get<PaginatedResponse<Actor>>('/api/actors', { params });
  return response.data;
};

/** Fetches a single actor by ID, including their filmography. */
export const getActorById = async (id: number): Promise<Actor> => {
  const response = await apiClient.get<Actor>(`/api/actors/${id}`);
  return response.data;
};
