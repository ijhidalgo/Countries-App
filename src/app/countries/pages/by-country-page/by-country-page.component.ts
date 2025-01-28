import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries:Country[] = [];

  searchByCountry (val: string):void {
    this.cServ.searchCountry(val)
    .subscribe(countries => {
      this.countries = countries
    }
    )
  }

  constructor(private cServ:CountriesService) {}
}
