import { Component, OnInit } from '@angular/core';

export class Location {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor() { }

  locations: Location[] = [
    {
    _id: '5d349ad98678381d9c094159',
    name: 'Starcups',
    distance: 14.0,
    address: 'High Street, Downtown',
    rating: 3,
    facilities: ['Hot drinks', 'Foods', 'Wifi']
    },
    {
      _id: '5d349ad98678381d9c094159',
      name: 'Coffeee',
      distance: 140000.0,
      address: 'High Street, Downtown',
      rating: 5,
      facilities: ['Hot drinks', 'Foods', 'Wifi']
    },
    {
      _id: '5d349ad98678381d9c094159',
      name: 'Starcraft!',
      distance: 11114.0,
      address: 'High Street, Downtown',
      rating: 5,
      facilities: ['Hot drinks', 'Foods', 'Wifi']
    }
  ];

  ngOnInit() {
  }

}
