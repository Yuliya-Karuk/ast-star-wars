export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface APIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface FavoriteItem {
  id: string;
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';
