import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Hero } from '../interfaces/hero';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HeroServiceService {
  private _url = environment.api
  private hero: Hero

  constructor(private httpClient: HttpClient) { }

  deleteById(id: string) {
    return this.httpClient.delete(`${this._url}/${id}`).subscribe()
  }

  findById(id: string) {
    this.httpClient.get<Hero>(`${this._url}/${id}`).subscribe(
      res => {
        this.hero = res
      }
    )
    return this.httpClient.get<Hero>(`${this._url}/${id}`)
  }

  findByName(name: string): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this._url}/search/${name}`).pipe(
      tap(res => {
        this.hero = res;
      })
    )
  }

  updateHeroInformation(id: string, hero: Hero) {
    return this.httpClient.put<Hero>(`${this._url}/${id}`, hero).subscribe()
  }

  createHero(hero: Hero) {
    return this.httpClient.post(this._url, hero).subscribe()
  }
}
