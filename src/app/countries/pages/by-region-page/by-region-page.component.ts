import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public countries:Country[] = [];

  searchByRegion(val: string):void {
    this.cSer.searchRegion(val).subscribe(
      countries => {
        this.countries = countries
      }
    )
  }

  constructor(private cSer:CountriesService) {}
}
