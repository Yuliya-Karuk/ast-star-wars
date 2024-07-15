import { APIResponse, Character } from '@models/index';

export class ApiService {
  private basicPeopleUrl: string = 'https://swapi.dev/api/people/';

  public async getPeople(): Promise<APIResponse> {
    try {
      const response = await fetch(this.basicPeopleUrl, {
        method: 'GET',
      });

      const people: APIResponse = await response.json();
      return people;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async searchPeopleByName(searchValue: string, page: string = '1'): Promise<APIResponse> {
    const url = `${this.basicPeopleUrl}?search=${searchValue}&page=${page}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      const people: APIResponse = await response.json();
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
}

export const api = new ApiService();
