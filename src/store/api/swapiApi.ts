import { Character, FavoriteItem, PaginatedCharacters, PaginatedFilms, Planet } from '@models/index';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: SWAPI_BASE_URL }),
  endpoints: builder => ({
    getPeople: builder.query<PaginatedCharacters, void>({
      query: () => 'people/',
    }),
    searchPeople: builder.query<PaginatedCharacters, { searchValue: string; page?: number }>({
      query: ({ searchValue, page = 1 }) => `people/?search=${searchValue}&page=${page}`,
    }),
    getCharacterById: builder.query<Character, number>({
      query: id => `people/${id}`,
    }),
    getCharactersByIds: builder.query<Character[], FavoriteItem[]>({
      queryFn: async (arg, _api, _extraOptions, baseQuery) => {
        try {
          const promises = arg.map(id => baseQuery(`people/${id.id}`));
          const result = await Promise.all(promises);

          const resultData = result.map(res => res.data as Character);
          return { data: resultData as Character[] };
        } catch (err) {
          return { error: err as FetchBaseQueryError };
        }
      },
    }),
    getPlanet: builder.query<Planet, string>({
      query: url => `${url}`,
    }),
    getFilms: builder.query<PaginatedFilms, void>({
      query: () => 'films/',
    }),
  }),
});

export const {
  useGetPeopleQuery,
  useSearchPeopleQuery,
  useLazyGetCharacterByIdQuery,
  useGetCharacterByIdQuery,
  useGetCharactersByIdsQuery,
  useGetPlanetQuery,
  useGetFilmsQuery,
} = swapiApi;
