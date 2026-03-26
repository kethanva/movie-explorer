import { apiClient } from './api';
import { Director, PaginatedResponse } from '../types';

// Fetch paginated directors
export const getDirectors = async (params?: {
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<Director>> => {
  const response = await apiClient.get<PaginatedResponse<Director>>('/api/directors', { params });
  return response.data;
};

// Fetch director by id
export const getDirectorById = async (id: number): Promise<Director> => {
  const response = await apiClient.get<Director>(`/api/directors/${id}`);
  return response.data;
};
