import {
  Character,
  CharacterWithId,
  FavoriteItem,
  PaginatedCharacters,
  PaginatedCharactersWithId,
  PaginatedFilms,
  Planet,
} from '@models/index';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { extractIdFromUrl } from '@utils/utils';

const SWAPI_BASE_URL = 'https://swapi.dev/api/';

const addIdToCharacter = (character: Character): CharacterWithId => {
  const id = extractIdFromUrl(character.url);
  return {
    ...character,
    id,
  };
};

const addIdToCharacters = (response: PaginatedCharacters): PaginatedCharactersWithId => ({
  ...response,
  results: response.results.map(addIdToCharacter),
});

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({ baseUrl: SWAPI_BASE_URL }),
  endpoints: builder => ({
    getPeople: builder.query<PaginatedCharactersWithId, void>({
      query: () => 'people/',
      transformResponse: addIdToCharacters,
    }),
    searchPeople: builder.query<PaginatedCharactersWithId, { searchValue: string; page?: number }>({
      query: ({ searchValue, page = 1 }) => `people/?search=${searchValue}&page=${page}`,
      transformResponse: addIdToCharacters,
    }),
    getCharacterById: builder.query<CharacterWithId, number>({
      query: id => `people/${id}`,
      transformResponse: addIdToCharacter,
    }),
    getCharactersByIds: builder.query<CharacterWithId[], FavoriteItem[]>({
      queryFn: async (arg, _api, _extraOptions, baseQuery) => {
        try {
          _api.dispatch({ type: 'FETCH_START' });

          const promises = arg.map(id => baseQuery(`people/${id.id}`));
          const result = await Promise.all(promises);

          const resultData = result.map(res => res.data as Character);
          const preparedData = resultData.map(res => addIdToCharacter(res));

          _api.dispatch({ type: 'FETCH_SUCCESS' });

          return { data: preparedData as CharacterWithId[] };
        } catch (err) {
          _api.dispatch({ type: 'FETCH_ERROR', error: err });

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
