import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service';
import { GeolocationService } from '../geolocation.service';
import { Location } from '../location'

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(
    private loc8rDataService: Loc8rDataService,
    private geolocationService: GeolocationService
    ) { }

  public message: string;
  
  public locations: Location[];

  ngOnInit() {
    this.getPosition();
  }

  private getLocations(position: any): void {
    this.message = 'Seraching for nearby places';
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;

    this.loc8rDataService
      .callLocations(lat, lng)
      .then(found => {
        this.message = found.length > 0 ? '':'No locations found';
        this.locations = found;
      });
  };

  private showError(error: any): void {
    this.message = error.message;
  };

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  };

  private getPosition(): void {
    this.message = 'Getting your location...';
    this.geolocationService.getPosition(
      this.getLocations.bind(this), 
      this.showError.bind(this), 
      this.noGeo.bind(this));
  }
}
