import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap} from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl:string = 'https://restcountries.com/v3.1/';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []}
  }

  constructor(private httpClient: HttpClient) {
      this.loadFromLocalStorage();
    }

  searchCountryByAlpha(term: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}alpha/${term}`)
    .pipe(
      map(countries => countries.length > 0 ? countries[0] : null),
      catchError(() => of(null))
    )
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('cacheStore'))  {
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
  }

  private getCountriesRequest(url: string): Observable<Country[]> {

    return this.httpClient.get<Country[]>(url)
    .pipe(
      catchError(()=> of ([]))
    )
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}capital/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries} ),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchCountry (term: string): Observable<Country[]> {
    const url = `${this.apiUrl}name/${term}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountry = {term, countries}),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchRegion (region:Region): Observable<Country[]> {
    const url = `${this.apiUrl}region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region, countries}),
      tap( () => this.saveToLocalStorage())
    );
  }

}
