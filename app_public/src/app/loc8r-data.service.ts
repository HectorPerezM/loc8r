import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from './home-list/home-list.component';

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(private http: HttpClient) { }
  
  private apiBaseURL = 'http://localhost:3000/api';

  public callLocations(lat: number, lng:number): Promise<Location[]> {
    const maxDistance: number = 20;
    const url: string = `${this.apiBaseURL}/locations?lng=${lng}&lat=${lat}`;
    return this.http.get(url).toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
