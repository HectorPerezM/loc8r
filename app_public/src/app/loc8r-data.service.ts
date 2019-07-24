import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(private http: HttpClient) { }
  
  private apiBaseURL = 'http://localhost:3000/api';

  public callLocations(lat: number, lng:number): Promise<Location[]> {
    const url: string = `${this.apiBaseURL}/locations?lng=${lng}&lat=${lat}`;
    return this.http.get(url).toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseURL}/locations/${locationId}`;
    return this.http.get(url).toPromise()
      .then(res => res as Location)
      .catch(this.handleError);
  }

  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseURL}/locations/${locationId}/reviews`;
    return this.http.post(url, formData).toPromise()
      .then(res => res as Review)
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
