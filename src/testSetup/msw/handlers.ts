import { delay, http, HttpResponse } from 'msw';
import { mockedCharacters, mockedDetails, mockedFilms, mockedPlanet } from './mocks';

export const handlers = [
  http.get('https://swapi.dev/api/people', () => HttpResponse.json(mockedCharacters)),
  http.get('https://swapi.dev/api/people/1', () => {
    delay();
    return HttpResponse.json(mockedDetails);
  }),
  http.get('https://swapi.dev/api/planets/1/', () => HttpResponse.json(mockedPlanet)),
  http.get('https://swapi.dev/api/films', () => HttpResponse.json(mockedFilms)),
];
