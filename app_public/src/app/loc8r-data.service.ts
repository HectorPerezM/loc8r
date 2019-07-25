import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { User } from './user';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) { }
  
  private apiBaseURL = 'http://localhost:3000/api';

  public login(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<Authresponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user:User): Promise<Authresponse> {
    const url: string = `${this.apiBaseURL}/${urlPath}`;
    return this.http.post(url, user).toPromise()
      .then(res => res as Authresponse)
      .catch(this.handleError);
  }

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    
    return this.http.post(url, formData, httpOptions).toPromise()
      .then(res => res as Review)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
