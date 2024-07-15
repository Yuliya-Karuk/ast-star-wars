import { Character, PaginatedCharacters, PaginatedFilms, Planet } from '@models/index';

export class ApiService {
  private basicPeopleUrl: string = 'https://swapi.dev/api/people/';
  private basicFilmsUrl: string = 'https://swapi.dev/api/films/';

  public async getPeople(): Promise<PaginatedCharacters> {
    try {
      const response = await fetch(this.basicPeopleUrl, {
        method: 'GET',
      });

      const people: PaginatedCharacters = await response.json();
      return people;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async searchPeopleByName(searchValue: string, page: string = '1'): Promise<PaginatedCharacters> {
    const url = `${this.basicPeopleUrl}?search=${searchValue}&page=${page}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const people: PaginatedCharacters = await response.json();
      return people;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async getCharacterById(id: number): Promise<Character> {
    const url = `${this.basicPeopleUrl}${id}/`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const character: Character = await response.json();
      return character;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async getAllFilms(): Promise<PaginatedFilms> {
    const url = `${this.basicFilmsUrl}/`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const films: PaginatedFilms = await response.json();
      return films;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async getPlanet(url: string): Promise<Planet> {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const planet: Planet = await response.json();
      return planet;
    } catch (error) {
      throw Error('Error');
    }
  }
}

export const api = new ApiService();
