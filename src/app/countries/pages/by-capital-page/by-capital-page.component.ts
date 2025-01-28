import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries:Country[] = [];

  public searchByCapital(term: string):void {

    this.cServ.searchCapital(term)
    .subscribe(countries => {
      this.countries = countries;
    });
  }

  constructor(private cServ:CountriesService) {}
}
