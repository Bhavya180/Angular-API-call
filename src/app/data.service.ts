import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { art } from './art';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private heroesUrl = 'https://api.artic.edu/api/v1/artworks';

  constructor(
    private http: HttpClient){ }

  getHeroes(): Observable<art[]> {
  return this.http.get<art[]>(this.heroesUrl)
}
}
