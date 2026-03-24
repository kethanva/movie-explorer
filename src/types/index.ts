export interface Genre {
  id: number;
  name: string;
}

export interface Director {
  id: number;
  name: string;
  bio?: string;
  birth_date?: string;
  nationality?: string;
  photo_url?: string;
  movies?: Movie[];
}

export interface Actor {
  id: number;
  name: string;
  bio?: string;
  birth_date?: string;
  nationality?: string;
  photo_url?: string;
  movies?: Movie[];
}

export interface Review {
  id: number;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Movie {
  id: number;
  title: string;
  release_year: number;
  synopsis?: string;
  poster_url?: string;
  rating: number;
  genres: Genre[];
  director: Director;
  actors: Actor[];
  reviews?: Review[];
}

export interface MovieFilters {
  genre_id?: string;
  director_id?: string;
  actor_id?: string;
  year?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export type WatchStatus = 'favorite' | 'watch_later';

export interface SavedMovie {
  id: number;
  title: string;
  release_year: number;
  poster_url?: string;
  rating: number;
  genres: Genre[];
  status: WatchStatus;
  saved_at: string;
}
