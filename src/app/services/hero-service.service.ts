import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceService {
  private _url = environment.api

  constructor(private httpClient: HttpClient) { }

  findById(id: string) {
    return this.httpClient.get<Hero>(this._url + id)
  }

  findByName(name: string) {
    return this.httpClient.get<Hero>(this._url + "search/" + name)
  }
}
