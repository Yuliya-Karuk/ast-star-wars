import { APIResponse } from '../types/types';

export class ApiService {
  private basicUrl: string = 'https://swapi.dev/api/people/';

  public async getPeople(): Promise<APIResponse> {
    try {
      const response = await fetch(this.basicUrl, {
        method: 'GET',
      });

      const people: APIResponse = await response.json();
      return people;
    } catch (error) {
      throw Error('Error');
    }
  }

  public async searchPeopleByName(searchValue: string): Promise<APIResponse> {
    const url = `${this.basicUrl}?search=${searchValue}`;
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
}

export const api = new ApiService();
