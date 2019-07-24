import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service'
import { Location } from '../location'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  
  constructor(
    private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
    ) { }
  
  newLocation: Location;
  
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('locationId');
          return this.loc8rDataService.getLocationById(id);
        })
      )
      .subscribe((newLocation: Location) => {
        this.newLocation = newLocation;
        this.pageContent.header.title = newLocation.name;
        this.pageContent.sidebar = `${newLocation.name} is on Loc8r because is has an incredible wifi and coffe, this will help you to get your work done.\n\n If like this place - or if you don\'t - please leave a review to help other people.`
      }); 
  }

  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };

}
