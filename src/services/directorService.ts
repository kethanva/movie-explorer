import { apiClient } from './api';
import { Director, PaginatedResponse } from '../types';

/** Fetches a paginated list of directors. */
export const getDirectors = async (params?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<Director>> => {
  const response = await apiClient.get<PaginatedResponse<Director>>('/api/directors', { params });
  return response.data;
};

/** Fetches a single director by ID, including their filmography. */
export const getDirectorById = async (id: number): Promise<Director> => {
  const response = await apiClient.get<Director>(`/api/directors/${id}`);
  return response.data;
};
